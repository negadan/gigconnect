Okay, based on the Refined Application Idea and the Product Requirements Document (PRD), here is the Architecture Document for the GigConnect AI Hackathon MVP.

```markdown
# Architecture Document: GigConnect AI (Hackathon MVP)

* **Version:** 1.0
* **Date:** 2025-05-03
* **Author:** Expert Software Architect AI
* **Based On:**
    * Refined Application Idea vLatest (from BA)
    * Product Requirements Document v1.1

## 1. Overview

This document outlines the technical architecture for the GigConnect AI mobile application's Minimum Viable Product (MVP), specifically designed for development within a 24-hour hackathon timeframe. The application connects users for local, small-value gigs (<= R1000 ZAR) in Midrand/Gauteng, leveraging AI extensively for profile/gig creation and suggestions. The architecture prioritizes rapid development, leveraging a Backend-as-a-Service (BaaS) platform and focusing on core AI integrations.

## 2. Technology Stack

* **Mobile Frontend Framework:** Expo SDK (Managed Workflow preferred, Dev Client if required for specific native modules not available in Go)
    * **Language:** TypeScript
    * **UI Library:** React Native Core Components.
        * **Recommended UI Kit (Optional, if time permits & accelerates):** React Native Paper (Evaluate complexity vs. speed gain).
        * **Key Library:** `react-native-deck-swiper` or similar for F5 Swipeable Gig Discovery.
* **Backend:** Supabase (BaaS)
    * **Authentication:** Supabase Auth (Email/Password)
    * **Database:** Supabase PostgreSQL
    * **Serverless Functions:** Supabase Edge Functions (Deno/TypeScript) - **CRITICAL** for secure AI service interaction.
* **AI Service:** Microsoft Azure OpenAI Service
    * **Model:** `gpt-3.5-turbo` (or latest equivalent available)
    * **Access:** Via secure REST API calls proxied through Supabase Edge Functions ONLY.
* **AI Coding Assistants:** Cursor AI (Primary), Microsoft Copilot (Secondary)
* **Version Control:** Git (Platform TBD, e.g., GitHub, GitLab)

## 3. Application Structure

* **Architecture Pattern:** Backend-as-a-Service (BaaS) Enhanced Client Application.
    * The primary application logic resides within the Expo/React Native mobile client.
    * Supabase provides backend services (Auth, Database, Edge Functions) directly callable from the client (via Supabase SDKs) or via Edge Functions.
    * Supabase Edge Functions act as a secure proxy layer, primarily for interacting with the external Azure OpenAI service. This prevents exposing sensitive API keys in the client application.

```
+--------------------------+       +----------------------+       +------------------------+
|   GigConnect AI Mobile   | ----> |  Supabase Platform   | ----> | Azure OpenAI Service   |
|    (Expo/React Native)   |       |        (BaaS)        |       |    (GPT-3.5-Turbo)     |
|                          |       +----------------------+       +------------------------+
| - UI Components          |       | - Auth               |               /|\             
| - State Management (Client)|       | - Database (Postgres)|                |              
| - Business Logic (Client)|<----->| - Edge Functions     |----------------+              
| - Supabase SDK Usage     |       |   (Secure AI Proxy)  |                                
+--------------------------+       +----------------------+                                
```

## 4. Key Components / Modules

* **Mobile Application (Expo/React Native):**
    * **Auth Module:** Handles user signup, login, logout flows using Supabase Auth SDK. Manages auth state.
    * **Profile Module:**
        * AI Profile Creation Chat Interface (F2). Manages conversational state.
        * Calls Supabase Edge Function for AI interaction & data extraction.
        * Calls Supabase SDK to save profile data.
    * **Gig Module:**
        * AI Gig Creation Chat Interface (F3). Manages conversational state. Enforces R1000 limit logic.
        * Calls Supabase Edge Function for AI interaction & data extraction.
        * Calls Supabase Edge Function for AI Price Recommendation (F4).
        * Calls Supabase SDK to save gig data (including final price).
    * **Discovery Module:**
        * Swipeable Card Interface (F5) using `react-native-deck-swiper`. Fetches gigs from Supabase DB. Records swipes/likes.
        * AI Gig Suggestions Feed (F6). Fetches suggestions based on basic matching logic (client-side or simple Supabase query).
    * **Gig Details Module:** Displays detailed gig information (F7). Includes button to trigger AI Milestone Suggestion (F8).
    * **Milestone Module:** Calls Supabase Edge Function for AI Milestone Suggestions (F8). Displays results.
    * **Informational Module:** Displays static content for F9 (SA Labour Law, NPO Info, Disclaimer).
    * **Core Services:** Supabase SDK integration, state management (e.g., Zustand, Context API - choose simplest effective option), basic navigation (e.g., React Navigation).
* **Supabase Backend:**
    * **Auth Service:** Manages user identities.
    * **Database Service (PostgreSQL):** Stores user profiles, gigs, potentially 'liked' gigs. See Section 5.
    * **Edge Functions Service (Deno/TypeScript):**
        * `ai_proxy`: A secure function taking prompts/context from the client, calling Azure OpenAI API (using securely stored key), and returning the result. Handles different AI tasks (profile chat, gig chat, price suggestion, milestone suggestion) based on input parameters. Must implement robust error handling for Azure API calls.

## 5. Data Models / Database Schema (Supabase PostgreSQL)

* **Users Table:** Managed by Supabase Auth (standard `auth.users` table). Contains user ID, email, etc..
* **Profiles Table:**
    * `id`: UUID (Primary Key, Foreign Key to `auth.users.id`)
    * `user_id`: UUID (Unique, links to `auth.users.id`)
    * `created_at`: TimestampTZ
    * `updated_at`: TimestampTZ
    * `skills`: TEXT[] (Array of strings, extracted by AI)
    * `interests`: TEXT[] (Array of strings, extracted by AI)
    * `availability`: TEXT (e.g., "Weekends", "Evenings", extracted by AI)
    * `location_area`: TEXT (e.g., "Midrand", "Waterfall", extracted by AI)
    * *Consider adding embedding field later for pgvector (Post-MVP)*
* **Gigs Table:**
    * `id`: UUID (Primary Key)
    * `created_at`: TimestampTZ
    * `updated_at`: TimestampTZ
    * `poster_user_id`: UUID (Foreign Key to `auth.users.id`)
    * `title`: TEXT (Generated by AI)
    * `description`: TEXT (Generated by AI)
    * `skills_required`: TEXT[] (Optional, extracted by AI)
    * `location_area`: TEXT (Required, extracted by AI)
    * `price_zar`: NUMERIC(10, 2) (Final price set by user, <= 1000.00)
    * `status`: TEXT (e.g., 'open', 'assigned', 'completed' - Default 'open' for MVP)
    * *Consider adding embedding field later for pgvector (Post-MVP)*
* **Liked_Gigs Table (for F5.2 Swipe Right):**
    * `id`: BIGSERIAL (Primary Key)
    * `user_id`: UUID (Foreign Key to `auth.users.id`)
    * `gig_id`: UUID (Foreign Key to `gigs.id`)
    * `created_at`: TimestampTZ
    * `UNIQUE (user_id, gig_id)` constraint

*Relationships:*
* One User (`auth.users`) has one Profile (`profiles`).
* One User (`auth.users`) can post many Gigs (`gigs`).
* One User (`auth.users`) can like many Gigs (`liked_gigs`).
* One Gig (`gigs`) can be liked by many Users (`liked_gigs`).

## 6. API Design (Supabase Edge Function - `ai_proxy`)

* **Endpoint:** `/ai_proxy` (or similar, defined in Supabase)
* **Method:** POST
* **Authentication:** Requires Supabase user JWT token.
* **Request Body (Example Structure):**
    ```json
    {
      "task": "gig_creation_chat" | "profile_creation_chat" | "price_recommendation" | "milestone_suggestion",
      "context": {
        // Task-specific context, e.g.:
        "conversation_history": [ /* for chat tasks */ ],
        "user_input": "I need help walking my dog in Waterfall.", // for chat tasks
        "gig_description": "Walk a friendly golden retriever in Waterfall for 1 hour.", // for price/milestone tasks
        // ... other necessary data based on the task
      }
    }
    ```
* **Response Body (Success - 200 OK):**
    ```json
    {
      "task": "...", // Echo back the task
      "result": {
        // Task-specific result, e.g.:
        "ai_response": "Okay, when would you like the dog walked?", // for chat tasks
        "extracted_data": { /* structured data for profile/gig */ }, // for chat tasks
        "price_range_zar": [50, 100], // for price recommendation
        "suggested_milestones": ["Confirm walk time", "Meet owner and dog", "Complete walk", "Confirm completion"] // for milestone suggestion
      }
    }
    ```
* **Response Body (Error - e.g., 400 Bad Request, 500 Internal Server Error, 503 Service Unavailable):**
    ```json
    {
      "error": "Brief description of the error",
      "details": "Optional further details (avoid leaking sensitive info)"
    }
    ```
* **Key Implementation Detail:** The Edge Function retrieves the Azure OpenAI API Key from secure environment variables within Supabase. It constructs the appropriate prompt for Azure OpenAI based on the `task` and `context`, makes the API call, parses the response, and returns the structured result or error.

## 7. Authentication / Authorization Strategy

* **Authentication:** Supabase Auth (Email/Password). The Expo app uses the Supabase client SDK to handle signup, login, session management, and logout.
* **Authorization:**
    * **API Access:** Supabase Edge Functions will be protected and require a valid user session (JWT token) passed from the client.
    * **Database Access:** Row Level Security (RLS) policies MUST be configured in Supabase PostgreSQL:
        * Users can only select/update their own `profiles` record.
        * Users can only insert/update/delete `gigs` they posted (`poster_user_id` matches `auth.uid()`).
        * Authenticated users can select all `gigs` where `status` is 'open'.
        * Users can only insert/select/delete their own `liked_gigs` records.
        * Implement RLS policies diligently to prevent unauthorized data access.

## 8. Deployment Strategy

* **Mobile App (Expo):**
    * Use Expo Application Services (EAS) Build to create development and production builds for iOS and Android simulators/devices.
    * For the hackathon, focus on development builds (`eas build --profile development --platform all`).
    * Distribution via TestFlight (iOS) / Internal Testing (Android) or direct installation for demo purposes.
    * *CI/CD (Post-Hackathon):* Set up EAS Build pipelines triggered by Git pushes to specific branches (e.g., `main`, `develop`).
* **Backend (Supabase):**
    * **Database Schema:** Manage schema changes using Supabase Migrations (generate migration files locally, apply via Supabase CLI or dashboard).
    * **Edge Functions:** Deploy using Supabase CLI (`supabase functions deploy <function_name>`). Store Azure OpenAI API key as a secret via Supabase Dashboard/CLI (`supabase secrets set AZURE_OPENAI_KEY=...`).
    * **RLS Policies:** Apply via SQL scripts in migrations or directly in the Supabase Dashboard.
    * **Infrastructure:** Managed entirely by Supabase cloud platform.

## 9. Infrastructure Requirements

* **Supabase Project:** One project instance on Supabase Cloud (Free/Pro tier suitable for hackathon).
* **Azure OpenAI Service:** Access credentials (Endpoint and API Key) for a deployed `gpt-3.5-turbo` model.
* **Expo Account:** For using EAS Build services.
* **Development Machines:** Standard setup with Node.js, npm/yarn, Expo CLI, Supabase CLI, Git, VS Code (with Cursor/Copilot extensions).
* **Testing Devices:** iOS Simulator / Android Emulator, and ideally physical devices for testing builds.

## 10. Security Considerations

* **API Key Security:** **PARAMOUNT.** Azure OpenAI API Key MUST NOT be embedded in the client app. It must be stored securely as an environment variable/secret within Supabase Edge Functions. The Edge Function acts as the sole, secure gateway to the AI service.
* **Authentication:** Rely on Supabase Auth's security mechanisms.
* **Authorization (RLS):** Implement strict Row Level Security policies in the database to prevent users from accessing or modifying data that isn't theirs.
* **Input Validation:** Validate data received from the client in Edge Functions before processing or sending it to Azure OpenAI. Sanitize AI outputs before displaying them or storing them if necessary, although for MVP, trust in GPT-3.5-Turbo's safety alignment might be sufficient for non-sensitive text generation.
* **Rate Limiting:** (Post-Hackathon) Consider implementing rate limiting on the Supabase Edge Function to prevent abuse and manage costs.
* **Data Privacy:** Be mindful of the user data collected (skills, interests, location). Ensure clear communication about data usage (potentially in F9 Informational Content). Follow standard practices for handling user data.
* **Secure SDK Usage:** Use official Supabase SDKs for client-backend interaction.

## 11. UI/UX Structure (Key Screens & Flow)

Based on PRD Features:

1.  **Auth Flow:**
    * Login Screen (F1.2)
    * Signup Screen (F1.1) -> Redirects to AI Profile Creation on first login.
2.  **Profile Creation Flow:**
    * AI Profile Chat Screen (F2.1, F2.2): Conversational interface.
3.  **Main App Flow (Post-Login/Profile):**
    * **Gig Discovery Screen (F5):** Default view. Swipeable cards (F5.1-F5.4). Access to Suggestions (F6) and Post Gig (F3).
    * **AI Gig Suggestions Screen (F6):** List/grid view of suggested gigs (F6.1-F6.3). Tapping a gig goes to Gig Details.
    * **Post Gig Flow:**
        * AI Gig Creation Chat Screen (F3.1, F3.2): Conversational interface. Includes R1000 limit logic (F3.3).
        * Price Recommendation/Confirmation Screen (F4): Displays AI range (F4.3), allows user input/confirmation (F4.4). -> Saves gig (F3.5).
    * **Gig Details Screen (F7):** Accessed from Discovery or Suggestions. Displays title, description, price, location, skills (F7.2). Contains "Suggest Steps" button (F8.1).
    * **(Modal/Overlay on Gig Details):** AI Milestone Suggestions display (F8.3).
    * **Informational Screen (F9):** Accessible via settings/menu. Displays SA Labour context, links, disclaimer, NPO info (F9.1-F9.5).
    * **(Simple Settings/Menu):** Access to Informational Screen, Logout (F1.3).

*Navigation:* Use a simple navigation structure, potentially a bottom tab navigator for Discovery/Suggestions/Post Gig and a stack navigator for nested flows like Auth, Gig Details, and Profile/Gig Creation. Prioritize clarity and ease of access to core features within the hackathon timeframe.

```