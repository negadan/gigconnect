// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://deno.land/x/edge_runtime/mod.d.ts" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Get environment variables
const azureOpenAIKey = Deno.env.get('AZURE_OPENAI_KEY')
const azureOpenAIEndpoint = Deno.env.get('AZURE_OPENAI_ENDPOINT')
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Type definitions for request and response
interface RequestBody {
  task: string;
  context: Record<string, any>;
}

interface ResponseData {
  status: string;
  task?: string;
  result?: Record<string, any>;
  error?: string;
}

// Handle CORS preflight requests
function handleCors(req: Request): Response | undefined {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  return undefined
}

// Validate JWT token in request
async function validateToken(req: Request) {
  // Get the Authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    throw new Error('Missing Authorization header')
  }

  // Extract the JWT token
  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    throw new Error('Missing Bearer token')
  }

  // Initialize Supabase client to validate the token
  const supabase = createClient(
    supabaseUrl || '',
    supabaseServiceKey || '',
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  )

  // Get user info from JWT to validate
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    throw new Error(error?.message || 'Invalid token')
  }

  return user
}

// Call Azure OpenAI Service
async function callAzureOpenAI(task: string, context: Record<string, any>): Promise<ResponseData> {
  // This is a placeholder structure for the Azure OpenAI API call
  // Will be expanded in future stories with specific prompt engineering for each task
  if (!azureOpenAIEndpoint || !azureOpenAIKey) {
    throw new Error('Azure OpenAI credentials not configured')
  }

  // For now, return a dummy response based on the task
  // This will be replaced with actual Azure OpenAI API calls in subsequent stories
  return {
    status: "ok",
    task,
    result: {
      ai_response: "This is a placeholder response. The AI integration will be implemented in subsequent stories.",
      extracted_data: {}
    }
  }
}

// Main handler function
Deno.serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate the token and get user
    const user = await validateToken(req)

    // Parse request body
    let body: RequestBody
    try {
      body = await req.json()
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate required parameters
    if (!body.task || !body.context) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: task and context' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process the request based on the task
    let response: ResponseData
    switch (body.task) {
      // Task implementations will be added in future stories
      default:
        // For now, call the placeholder Azure OpenAI function
        response = await callAzureOpenAI(body.task, body.context)
    }

    // Return successful response
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const status = errorMessage.includes('token') || errorMessage.includes('Authorization') ? 401 : 500
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai_proxy' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
