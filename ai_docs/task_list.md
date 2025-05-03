Okay, acting as the Product Owner, I have analyzed the Product Requirements Document (PRD v1.1) and the Architecture Document (v1.0). Based on these inputs, here is the highly granular, sequenced task list designed for the GigConnect AI Hackathon MVP development, keeping in mind the 24-hour timeframe and the team composition (1 Junior, 3 Senior developers).

This list is in the precise logical order required for implementation and aims to be clear enough for even a junior developer to follow task by task.

---

**GigConnect AI Hackathon MVP - Sequenced Task List**

**Phase 1: Setup & Backend Foundation**

1.  **[Enabler]** **Account Setup: Supabase** - Create a new Supabase project. Note down project URL and `anon` key.
2.  **[Enabler]** **Account Setup: Azure OpenAI** - Ensure access to Azure OpenAI Service endpoint and API Key for `gpt-3.5-turbo`.
3.  **[Enabler]** **Project Setup: Version Control** - Initialize a Git repository (e.g., on GitHub/GitLab). Define branching strategy (e.g., `main`, `develop`, feature branches). Add `README.md`.
4.  **[Enabler]** **Project Setup: Local Environment** - Ensure all developers have Node.js, npm/yarn, Expo CLI, Supabase CLI installed.
5.  **[Enabler]** **Project Setup: Supabase CLI Login** - Developers log in to Supabase CLI (`supabase login`). Link local project to the remote Supabase project (`supabase link --project-ref <project-id>`).
6.  **[Enabler]** **Backend Setup: Supabase Secrets** - Securely store the Azure OpenAI API Key and Endpoint URL as secrets in the Supabase project using the Supabase CLI (`supabase secrets set AZURE_OPENAI_KEY=...`, `supabase secrets set AZURE_OPENAI_ENDPOINT=...`). **Do NOT commit keys to Git.**
7.  **[Enabler]** **Backend Setup: Supabase Migrations Init** - Initialize Supabase database migrations (`supabase migration new init_schema`).
8.  **Backend: DB Schema (Profiles)** - Define the SQL for the `profiles` table in a new migration file (columns: `id`, `user_id`, `created_at`, `updated_at`, `skills`, `interests`, `availability`, `location_area`). Include foreign key constraint to `auth.users`.
9.  **Backend: DB Schema (Gigs)** - Define the SQL for the `gigs` table in the *same* migration file (columns: `id`, `created_at`, `updated_at`, `poster_user_id`, `title`, `description`, `skills_required`, `location_area`, `price_zar`, `status`). Include foreign key constraint to `auth.users`.
10. **Backend: DB Schema (Liked_Gigs)** - Define the SQL for the `liked_gigs` table in the *same* migration file (columns: `id`, `user_id`, `gig_id`, `created_at`). Include foreign keys and unique constraint (`user_id`, `gig_id`).
11. **Backend: DB Migrations Apply** - Apply the initial schema migration to the Supabase database (`supabase db push` or `supabase migration up`). Verify tables in Supabase Studio.
12. **Backend: RLS Policies (Profiles)** - Define and apply Row Level Security (RLS) policies for the `profiles` table:
    * Enable RLS for the table.
    * Policy: Allow users to SELECT their own profile (`auth.uid() = user_id`).
    * Policy: Allow users to INSERT their own profile (`auth.uid() = user_id`).
    * Policy: Allow users to UPDATE their own profile (`auth.uid() = user_id`).
    * (No DELETE policy needed for MVP).
13. **Backend: RLS Policies (Gigs)** - Define and apply Row Level Security (RLS) policies for the `gigs` table:
    * Enable RLS for the table.
    * Policy: Allow authenticated users to SELECT all `open` gigs (`auth.role() = 'authenticated' AND status = 'open'`).
    * Policy: Allow users to INSERT gigs for themselves (`auth.uid() = poster_user_id`).
    * Policy: Allow users to UPDATE gigs they posted (`auth.uid() = poster_user_id`).
    * Policy: Allow users to DELETE gigs they posted (`auth.uid() = poster_user_id`).
14. **Backend: RLS Policies (Liked_Gigs)** - Define and apply Row Level Security (RLS) policies for the `liked_gigs` table:
    * Enable RLS for the table.
    * Policy: Allow users to SELECT their own liked gigs (`auth.uid() = user_id`).
    * Policy: Allow users to INSERT their own liked gigs (`auth.uid() = user_id`).
    * Policy: Allow users to DELETE their own liked gigs (`auth.uid() = user_id`).
15. **[Enabler]** **Backend: Edge Function Setup** - Initialize a new Supabase Edge Function named `ai_proxy` (`supabase functions new ai_proxy`).
16. **Backend: Edge Function (ai_proxy) - Core Logic** - Implement the basic structure of the `ai_proxy` Edge Function (Deno/TypeScript):
    * Import necessary libraries (Supabase client, CORS headers).
    * Retrieve Azure OpenAI Key/Endpoint from environment variables/secrets.
    * Implement basic request handling (POST method).
    * Authenticate user request using Supabase JWT.
    * Parse incoming JSON request body (expecting `task` and `context`).
    * Implement basic error handling (e.g., missing auth, invalid request body).
    * Implement secure call structure to Azure OpenAI API (using `Workspace`).
    * Return a dummy success response or error response with appropriate CORS headers.
17. **Backend: Edge Function (ai_proxy) - Deployment** - Deploy the initial `ai_proxy` function (`supabase functions deploy ai_proxy`). Verify deployment in Supabase dashboard.

**Phase 2: Frontend Foundation & Authentication (F1)**

18. **[Enabler]** **Frontend Setup: Expo Project Init** - Create a new Expo project using TypeScript template (`npx create-expo-app gigconnect-ai -t expo-template-blank-typescript`).
19. **[Enabler]** **Frontend Setup: Dependencies** - Install core dependencies:
    * `@supabase/supabase-js`
    * `react-native-url-polyfill` (needed for Supabase)
    * `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs` (or chosen navigation)
    * `react-native-screens`, `react-native-safe-area-context` (for navigation)
    * `react-native-gesture-handler` (for navigation/swipe)
    * `@react-native-async-storage/async-storage` (for Supabase session persistence)
20. **[Enabler]** **Frontend Setup: Supabase Client** - Create a Supabase client instance configuration file (`src/lib/supabaseClient.ts`) using project URL and `anon` key, configuring AsyncStorage for session persistence.
21. **[Enabler]** **Frontend Setup: Basic Navigation** - Set up basic app navigation structure (e.g., StackNavigator for Auth, Main App flow). Create placeholder screens for Login, Signup, Main App.
22. **[Enabler]** **Frontend Setup: Environment Variables** - Configure Expo app (`app.json` or `.env`) for Supabase URL/anon key (ensure `.env` is in `.gitignore`).
23. **Frontend: Auth State Management** - Implement a simple auth state context/provider or state management (e.g., Zustand/Context API) to manage user session globally.
24. **Frontend: UI (Login Screen - F1.2)** - Create the UI for the Login screen (Email input, Password input, Login button, Link to Signup).
25. **Frontend: Logic (Login - F1.2)** - Implement the login functionality using `supabase.auth.signInWithPassword()`. Handle success (navigate to main app/profile creation) and error states (display message).
26. **Frontend: UI (Signup Screen - F1.1)** - Create the UI for the Signup screen (Email input, Password input, Confirm Password, Signup button, Link to Login).
27. **Frontend: Logic (Signup - F1.1)** - Implement the signup functionality using `supabase.auth.signUp()`. Handle success (potentially auto-login or navigate to Login, then check for profile) and error states.
28. **Frontend: Logic (Logout - F1.3)** - Implement logout functionality using `supabase.auth.signOut()` accessible from somewhere in the main app (e.g., settings/menu). Navigate back to Login screen.
29. **Frontend: Session Persistence** - Verify that the user session persists across app restarts using AsyncStorage.
30. **Frontend: Auth Flow Routing** - Implement logic to route users appropriately: show Auth screens if not logged in, show Profile Creation if logged in but no profile exists, show Main App if logged in with profile.

**Phase 3: Core AI Feature - Profile Creation (F2)**

31. **Frontend: UI (Profile Chat Screen - F2.1)** - Create the basic UI for the AI Profile Creation chat interface (message list view, text input field, send button).
32. **Frontend: State Management (Profile Chat - F2.2)** - Implement state management for the chat conversation history and user input.
33. **Backend: Edge Function (ai_proxy) - Profile Task** - Enhance the `ai_proxy` function:
    * Add specific logic to handle the `"profile_creation_chat"` task.
    * Retrieve conversation history and user input from the request `context`.
    * Construct a suitable prompt for Azure OpenAI for profile data gathering (skills, interests, availability, location). Include instructions to extract structured data (e.g., JSON).
    * Call Azure OpenAI API.
    * Parse the AI response (both the conversational reply and any extracted JSON data).
    * Return the AI's text response and extracted data in the function's success response.
34. **Backend: Edge Function (ai_proxy) - Redeployment** - Deploy the updated `ai_proxy` function.
35. **Frontend: API Call (Profile Chat - F2.3)** - Implement the function to call the deployed `ai_proxy` Supabase Edge Function from the Profile Chat screen, passing the conversation history and new user message (task: `"profile_creation_chat"`). Handle loading states.
36. **Frontend: Logic (Profile Chat - F2.2, F2.3)** - Implement the chat interaction logic:
    * Send user message to `ai_proxy`.
    * Display AI text response in the chat UI.
    * Store/accumulate extracted profile data from AI responses in component state.
    * Implement basic conversation termination logic (e.g., AI indicates completion, or user clicks "Done").
37. **Frontend: DB Save (Profile - F2.4)** - Implement the function to save the final accumulated/extracted profile data to the `profiles` table in Supabase using the Supabase JS SDK (`supabase.from('profiles').insert(...)`). Ensure `user_id` matches the logged-in user.
38. **Frontend: Navigation (Profile Completion)** - After successful profile save, navigate the user to the main application flow (e.g., Gig Discovery screen).

**Phase 4: Core AI Feature - Gig Creation & Pricing (F3, F4)**

39. **Frontend: UI (Gig Chat Screen - F3.1)** - Create the UI for the AI Gig Creation chat interface (similar to profile chat: message list, input, send button).
40. **Frontend: State Management (Gig Chat - F3.2)** - Implement state management for the gig chat conversation history and user input.
41. **Backend: Edge Function (ai_proxy) - Gig Task** - Enhance the `ai_proxy` function:
    * Add specific logic to handle the `"gig_creation_chat"` task.
    * Retrieve conversation history and user input from the request `context`.
    * Construct a suitable prompt for Azure OpenAI for gig data gathering (title, description, location, skills). Include instructions to extract structured JSON data. **Crucially, include context about the R1000 limit.**
    * Call Azure OpenAI API.
    * Parse the AI response (text reply + extracted JSON).
    * Return the AI's text response and extracted data.
42. **Backend: Edge Function (ai_proxy) - Redeployment** - Deploy the updated `ai_proxy` function.
43. **Frontend: API Call (Gig Chat - F3.4)** - Implement the function to call `ai_proxy` from the Gig Chat screen (task: `"gig_creation_chat"`).
44. **Frontend: Logic (Gig Chat - F3.2, F3.4)** - Implement the chat interaction logic:
    * Send user message to `ai_proxy`.
    * Display AI text response.
    * Store/accumulate extracted gig data.
    * Handle conversation completion.
45. **Frontend: Logic (R1000 Limit Check - F3.3)** - Implement client-side checks (or refine AI prompt) during/after gig creation chat to confirm the proposed task fits within the R1000 ZAR scope before proceeding. Display warnings if needed.
46. **Backend: Edge Function (ai_proxy) - Price Task** - Enhance the `ai_proxy` function:
    * Add specific logic to handle the `"price_recommendation"` task.
    * Retrieve gig description from the request `context`.
    * Construct a prompt for Azure OpenAI requesting a price *range* (ZAR, < R1000, Gauteng context).
    * Call Azure OpenAI API.
    * Parse the response to extract the price range.
    * Return the suggested price range.
47. **Backend: Edge Function (ai_proxy) - Redeployment** - Deploy the updated `ai_proxy` function.
48. **Frontend: UI (Price Recommendation Screen - F4.3)** - Create a simple screen/modal to display the AI-suggested price range and an input field for the user to set the final price.
49. **Frontend: API Call (Price Rec - F4.2)** - Implement the function call to `ai_proxy` (task: `"price_recommendation"`) after gig chat completion, passing the extracted gig description.
50. **Frontend: Logic (Set Final Price - F4.4)** - Display the AI range. Allow user input for the final price. **Enforce the <= R1000 ZAR limit** via client-side validation.
51. **Frontend: DB Save (Gig - F3.5, F4.4)** - Implement the function to save the final extracted gig data (including the user-confirmed final price) to the `gigs` table in Supabase. Link to `poster_user_id`. Set `status` to 'open'.
52. **Frontend: Navigation (Gig Completion)** - After successful gig save, navigate the user (e.g., back to Discovery screen).

**Phase 5: Core User Flow - Discovery & Details (F5, F7)**

53. **[Enabler]** **Frontend: Dependency (Swipe Cards)** - Install and configure `react-native-deck-swiper` or a similar library.
54. **Frontend: UI (Gig Discovery Screen - F5.1)** - Create the main UI for the discovery screen, integrating the deck swiper component. Design a basic card template to display minimal gig info (e.g., Title, Price, Location Area).
55. **Frontend: DB Fetch (Gigs for Discovery - F5.1)** - Implement the function to fetch `open` gigs from the Supabase `gigs` table (respecting RLS). Limit the initial fetch (e.g., 10-20 gigs).
56. **Frontend: Logic (Display Gigs - F5.1)** - Load the fetched gigs into the deck swiper state. Handle empty state (no gigs found).
57. **Frontend: UI (Gig Card Details)** - Enhance the gig card template to display relevant info clearly (Title, Price, Location Area, maybe first line of description or skills).
58. **Frontend: DB Save (Like Gig - F5.2)** - Implement the `onSwipedRight` handler for the swiper. On swipe right, insert a record into the `liked_gigs` table (linking `user_id` and `gig_id`). Handle potential unique constraint errors gracefully (user already liked).
59. **Frontend: Logic (Dismiss Gig - F5.3)** - Implement the `onSwipedLeft` handler. Simply remove the card from the deck (no backend action needed for MVP dismiss).
60. **Frontend: Logic (Fetch More Gigs - F5.4)** - Implement logic in `onSwipedAll` or based on card index to fetch the next batch of gigs when the initial set runs out. Avoid showing already swiped (liked/dismissed) gigs if feasible within time constraints (requires tracking dismissed IDs client-side or more complex queries).
61. **Frontend: UI (Gig Details Screen - F7.1)** - Create a new screen for displaying full Gig Details.
62. **Frontend: Navigation (To Gig Details)** - Implement navigation from the Gig Card (on tap) in the Discovery screen (and later, Suggestions screen) to the Gig Details screen, passing the `gig_id`.
63. **Frontend: DB Fetch (Single Gig - F7.2)** - On the Gig Details screen, fetch the full details for the specific `gig_id` from the Supabase `gigs` table.
64. **Frontend: Logic (Display Gig Details - F7.2)** - Display the fetched Title, Full Description, Final Price, Location Area, Skills Required. Handle loading and error states. Add a placeholder button "Suggest Steps".

**Phase 6: Supporting AI & Info Features (F6, F8, F9)**

65. **Frontend: UI (AI Gig Suggestions Screen - F6.1)** - Create a new screen or section (e.g., a tab) to display suggested gigs. Use a simple list or card grid layout.
66. **Frontend: DB Fetch (Profile Data for Suggestions)** - Fetch the current user's profile data (`skills`, `interests`) from Supabase.
67. **Frontend: DB Query (Basic Gig Suggestions - F6.2)** - Implement a Supabase query to fetch `open` gigs that *might* match the user's profile. **Keep this extremely simple for the hackathon**:
    * Option A (Easiest): Fetch all open gigs not posted by the user. Display them. (No matching).
    * Option B (Simple Match): Fetch open gigs where `location_area` matches profile `location_area` OR where any `skills_required` element overlaps with profile `skills` (using array operators like `<@` or `&&` if time permits, otherwise do basic client-side filtering after fetching). *Focus on Option A if time is tight.*
68. **Frontend: Logic (Display Suggestions - F6.3)** - Display the fetched/filtered suggested gigs. Allow tapping to navigate to the Gig Details screen (F7).
69. **Backend: Edge Function (ai_proxy) - Milestone Task** - Enhance the `ai_proxy` function:
    * Add specific logic to handle the `"milestone_suggestion"` task.
    * Retrieve gig description from the request `context`.
    * Construct a prompt for Azure OpenAI requesting 3-5 potential steps/milestones for the described gig.
    * Call Azure OpenAI API.
    * Parse the response to extract the suggested milestones list.
    * Return the list.
70. **Backend: Edge Function (ai_proxy) - Redeployment** - Deploy the updated `ai_proxy` function.
71. **Frontend: API Call (Milestones - F8.2)** - Implement the function called when the "Suggest Steps" button (F8.1) on the Gig Details screen is tapped. Call `ai_proxy` (task: `"milestone_suggestion"`), passing the gig description.
72. **Frontend: UI/Logic (Display Milestones - F8.3)** - Display the returned suggested milestones list on the Gig Details screen (e.g., in a modal or a dedicated section). Handle loading/error states.
73. **Frontend: UI (Informational Screen - F9.1)** - Create a new screen for informational content. Add access to it (e.g., from a settings menu or tab).
74. **Frontend: Content (Info Screen - F9.2, F9.3, F9.4, F9.5)** - Add static text content and clickable links (use `Linking` from React Native) covering:
    * SA Labour Law context (Independent Contractor vs Employee).
    * Links to Dept. of Labour / SARS.
    * Disclaimer (not legal advice).
    * NPO/NGO value proposition.

**Phase 7: Testing & Deployment Prep**

75. **[Enabler]** **Testing: Framework Setup** - (Optional - Time Permitting) Set up basic Jest testing for utility functions or simple component snapshots. Given the hackathon timeframe, manual testing is the priority.
76. **Testing: Manual E2E Flow** - Manually test the entire core flow: Signup -> AI Profile -> Post AI Gig -> Set Price -> Discover Gig (as another user) -> Swipe Right -> View Gig Details -> Suggest Milestones -> Logout -> Login. Test on simulators/emulators.
77. **Testing: Edge Cases (Basic)** - Test basic error handling: Invalid login, signup with existing email, trying to set price > R1000, AI function error display.
78. **[Enabler]** **Deployment: Expo EAS Setup** - Install EAS CLI (`npm install -g eas-cli`) and log in (`eas login`). Configure `eas.json` for a `development` build profile.
79. **Deployment: EAS Build (Development)** - Trigger a development build for testing on physical devices (`eas build --profile development --platform all`).
80. **Deployment: Install & Test Build** - Install the generated `.apk` / `.ipa` (via TestFlight/Internal Testing link or QR code) on test devices and perform final E2E checks.
81. **Code Cleanup & Final Review** - Review code for major issues, remove console logs, ensure API keys are definitely not in code. Update `README.md` with setup and running instructions.

---

This list provides a clear, sequential path. Dependencies between tasks (e.g., needing the `ai_proxy` function before frontend features can call it, needing DB tables before saving data) are respected. The granularity allows tasks to be picked up individually. Good luck with the hackathon!