# GigConnect AI - Hackathon MVP: Epics & User Stories

**Team:** Xavier (Junior), Themba (Senior), Daniel (Senior), Sandisile (Senior)
**Timeframe:** 24 Hours

---

## Epic 1: Setup & Backend Foundation

**Goal:** Establish the necessary accounts, project structures, database schema, security policies, and the basic AI proxy function.

**Story 1: [Enabler] Account Setup - Supabase**
* **Description:** As a Developer, I need to create a new Supabase project to host the backend infrastructure (Auth, DB, Functions).
* **PRD Context:** N/A (Infrastructure)
* **Architecture Context:** Supabase BaaS platform.
* **Acceptance Criteria:**
    * A new Supabase project is created.
    * Project URL and `anon` key are documented securely (e.g., in a shared password manager or secure note).
* **Dependencies:** None
* **Assignee:** Themba
* **Estimated Effort:** XS

**Story 2: [Enabler] Account Setup - Azure OpenAI**
* **Description:** As a Developer, I need to ensure the team has access to the Azure OpenAI Service endpoint and a valid API Key for the `gpt-3.5-turbo` model.
* **PRD Context:** NFR1, AIR1, AIR2
* **Architecture Context:** Azure OpenAI Service integration via Edge Functions.
* **Acceptance Criteria:**
    * Azure OpenAI endpoint URL is confirmed and documented securely.
    * Azure OpenAI API Key is confirmed and documented securely.
    * The designated model (`gpt-3.5-turbo` or equivalent) is accessible.
* **Dependencies:** None
* **Assignee:** Daniel
* **Estimated Effort:** XS

**Story 3: [Enabler] Project Setup - Version Control**
* **Description:** As a Developer, I need to initialize a Git repository and define a basic branching strategy to manage source code effectively.
* **PRD Context:** NFR6
* **Architecture Context:** Version Control (Git).
* **Acceptance Criteria:**
    * A new Git repository is created (e.g., GitHub/GitLab).
    * A `main` and `develop` branch are created.
    * A basic `README.md` file is added to the root.
    * The chosen branching strategy (e.g., feature branches off `develop`) is communicated to the team.
* **Dependencies:** None
* **Assignee:** Sandisile
* **Estimated Effort:** XS

**Story 4: [Enabler] Project Setup - Local Environment**
* **Description:** As a Developer Team, we need to ensure all members have the required development tools installed locally.
* **PRD Context:** Assumption in Section 4
* **Architecture Context:** Local Development Environment setup.
* **Acceptance Criteria:**
    * All developers confirm installation of Node.js (check version compatibility), npm/yarn, Expo CLI, Supabase CLI.
* **Dependencies:** None
* **Assignee:** All (Self-check)
* **Estimated Effort:** S

**Story 5: [Enabler] Project Setup - Supabase CLI Login & Link**
* **Description:** As a Developer, I need to log in to the Supabase CLI and link my local development environment to the shared remote Supabase project.
* **PRD Context:** N/A (Tooling)
* **Architecture Context:** Supabase CLI usage.
* **Acceptance Criteria:**
    * Developer successfully logs in via `supabase login`.
    * Developer successfully links the local project folder (once created in Story 18) using `supabase link --project-ref <project-id>`.
    * This needs to be done *after* the Expo project is initialized locally (Story 18).
* **Dependencies:** Story 1, Story 18 (Expo Init)
* **Assignee:** All
* **Estimated Effort:** S

**Story 6: [Enabler] Backend Setup - Supabase Secrets**
* **Description:** As a Backend Developer, I need to securely store the Azure OpenAI API Key and Endpoint URL as secrets within the Supabase project environment, ensuring they are never committed to Git.
* **PRD Context:** NFR1 (Critical), AIR2
* **Architecture Context:** Secure key management via Supabase Secrets for Edge Functions.
* **Acceptance Criteria:**
    * `AZURE_OPENAI_KEY` secret is set using `supabase secrets set`.
    * `AZURE_OPENAI_ENDPOINT` secret is set using `supabase secrets set`.
    * Verification that keys are not present in any Git-tracked files.
* **Dependencies:** Story 1, Story 2
* **Assignee:** Themba
* **Estimated Effort:** S

**Story 7: [Enabler] Backend Setup - Supabase Migrations Init**
* **Description:** As a Backend Developer, I need to initialize the database migration management feature for the Supabase project.
* **PRD Context:** N/A (Tooling)
* **Architecture Context:** Supabase Migrations.
* **Acceptance Criteria:**
    * `supabase migration new init_schema` command is run successfully within the linked local project folder.
    * A new migration file is created under the `supabase/migrations` directory.
* **Dependencies:** Story 5
* **Assignee:** Daniel
* **Estimated Effort:** XS

**Story 8: Backend: DB Schema - Profiles Table**
* **Description:** As a Backend Developer, I need to define the SQL schema for the `profiles` table in a Supabase migration file to store user profile information.
* **PRD Context:** F2.4, AI Profile Data Requirements
* **Architecture Context:** Data Model `profiles` table (Section 5). Target file: `supabase/migrations/<timestamp>_init_schema.sql` (or subsequent migration file).
* **Acceptance Criteria:**
    * SQL `CREATE TABLE profiles` statement is added to the migration file.
    * Columns defined: `id` (UUID, PK, references `auth.users`), `user_id` (UUID, Unique, references `auth.users`), `created_at` (timestamptz), `updated_at` (timestamptz), `skills` (TEXT[]), `interests` (TEXT[]), `availability` (TEXT), `location_area` (TEXT).
    * Appropriate constraints (PK, FK, Unique) are included.
    * Table enables RLS by default or explicitly.
* **Dependencies:** Story 7
* **Assignee:** Daniel
* **Estimated Effort:** M

**Story 9: Backend: DB Schema - Gigs Table**
* **Description:** As a Backend Developer, I need to define the SQL schema for the `gigs` table in a Supabase migration file to store gig information.
* **PRD Context:** F3.5, F4.4, Gig Data Requirements
* **Architecture Context:** Data Model `gigs` table (Section 5). Target file: `supabase/migrations/<timestamp>_init_schema.sql` (or subsequent migration file).
* **Acceptance Criteria:**
    * SQL `CREATE TABLE gigs` statement is added to the migration file.
    * Columns defined: `id` (UUID, PK), `created_at` (timestamptz), `updated_at` (timestamptz), `poster_user_id` (UUID, FK to `auth.users`), `title` (TEXT), `description` (TEXT), `skills_required` (TEXT[]), `location_area` (TEXT), `price_zar` (NUMERIC(10, 2)), `status` (TEXT, default 'open').
    * Appropriate constraints (PK, FK) are included. Check constraint `price_zar <= 1000.00` added.
    * Table enables RLS by default or explicitly.
* **Dependencies:** Story 7
* **Assignee:** Daniel
* **Estimated Effort:** M

**Story 10: Backend: DB Schema - Liked_Gigs Table**
* **Description:** As a Backend Developer, I need to define the SQL schema for the `liked_gigs` table in a Supabase migration file to track user interest in gigs.
* **PRD Context:** F5.2
* **Architecture Context:** Data Model `liked_gigs` table (Section 5). Target file: `supabase/migrations/<timestamp>_init_schema.sql` (or subsequent migration file).
* **Acceptance Criteria:**
    * SQL `CREATE TABLE liked_gigs` statement is added to the migration file.
    * Columns defined: `id` (BIGSERIAL, PK), `user_id` (UUID, FK to `auth.users`), `gig_id` (UUID, FK to `gigs`), `created_at` (timestamptz).
    * Unique constraint `UNIQUE (user_id, gig_id)` is added.
    * Appropriate constraints (PK, FK) are included.
    * Table enables RLS by default or explicitly.
* **Dependencies:** Story 7, Story 9 (for `gigs` table FK)
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 11: Backend: DB Migrations Apply**
* **Description:** As a Backend Developer, I need to apply the created database schema migrations to the remote Supabase database and verify the tables exist.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Applying Supabase Migrations.
* **Acceptance Criteria:**
    * `supabase db push` or `supabase migration up` command runs successfully.
    * `profiles`, `gigs`, and `liked_gigs` tables are visible in the Supabase Studio (Dashboard).
    * Table structures match the definitions in Stories 8, 9, 10.
* **Dependencies:** Story 8, Story 9, Story 10
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 12: Backend: RLS Policies - Profiles**
* **Description:** As a Backend Developer, I need to define and apply Row Level Security (RLS) policies for the `profiles` table to ensure users can only access and modify their own profile.
* **PRD Context:** NFR1, NFR7
* **Architecture Context:** Authorization (RLS) Section 7. Target table: `profiles`. Applied via SQL in migrations or Supabase Studio.
* **Acceptance Criteria:**
    * RLS is enabled for the `profiles` table.
    * SQL policy allowing users to `SELECT` their own profile (`auth.uid() = user_id`) is created and applied.
    * SQL policy allowing users to `INSERT` their own profile (`auth.uid() = user_id`) is created and applied.
    * SQL policy allowing users to `UPDATE` their own profile (`auth.uid() = user_id`) is created and applied.
    * Policies are tested (e.g., using Supabase SQL Editor with different user contexts if possible, or prepare for client-side testing).
* **Dependencies:** Story 11
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 13: Backend: RLS Policies - Gigs**
* **Description:** As a Backend Developer, I need to define and apply Row Level Security (RLS) policies for the `gigs` table for viewing, creating, and managing gigs.
* **PRD Context:** NFR1, NFR7, F3, F5
* **Architecture Context:** Authorization (RLS) Section 7. Target table: `gigs`. Applied via SQL in migrations or Supabase Studio.
* **Acceptance Criteria:**
    * RLS is enabled for the `gigs` table.
    * SQL policy allowing authenticated users to `SELECT` gigs with `status = 'open'` is created and applied.
    * SQL policy allowing users to `INSERT` gigs for themselves (`auth.uid() = poster_user_id`) is created and applied.
    * SQL policy allowing users to `UPDATE` gigs they posted (`auth.uid() = poster_user_id`) is created and applied.
    * SQL policy allowing users to `DELETE` gigs they posted (`auth.uid() = poster_user_id`) is created and applied.
    * Policies are tested.
* **Dependencies:** Story 11
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 14: Backend: RLS Policies - Liked_Gigs**
* **Description:** As a Backend Developer, I need to define and apply Row Level Security (RLS) policies for the `liked_gigs` table to ensure users manage only their own liked gigs.
* **PRD Context:** NFR1, NFR7, F5.2
* **Architecture Context:** Authorization (RLS) Section 7. Target table: `liked_gigs`. Applied via SQL in migrations or Supabase Studio.
* **Acceptance Criteria:**
    * RLS is enabled for the `liked_gigs` table.
    * SQL policy allowing users to `SELECT` their own liked gigs (`auth.uid() = user_id`) is created and applied.
    * SQL policy allowing users to `INSERT` their own liked gigs (`auth.uid() = user_id`) is created and applied.
    * SQL policy allowing users to `DELETE` their own liked gigs (`auth.uid() = user_id`) is created and applied.
    * Policies are tested.
* **Dependencies:** Story 11
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 15: [Enabler] Backend: Edge Function Setup**
* **Description:** As a Backend Developer, I need to initialize a new Supabase Edge Function named `ai_proxy` using the Supabase CLI.
* **PRD Context:** NFR1, AIR2
* **Architecture Context:** Supabase Edge Functions setup. Key component `ai_proxy`.
* **Acceptance Criteria:**
    * `supabase functions new ai_proxy` command runs successfully within the linked local project folder.
    * A new function directory `supabase/functions/ai_proxy` with boilerplate files (e.g., `index.ts`) is created.
* **Dependencies:** Story 5
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 16: Backend: Edge Function (ai_proxy) - Core Logic**
* **Description:** As a Backend Developer, I need to implement the basic structure and core logic for the `ai_proxy` Supabase Edge Function, including secure secret retrieval, request handling, user authentication, and a placeholder call structure to Azure OpenAI.
* **PRD Context:** NFR1, AIR2, AIR3, AIR4
* **Architecture Context:** `ai_proxy` Edge Function (Section 4, Section 6). Target file: `supabase/functions/ai_proxy/index.ts`.
* **Acceptance Criteria:**
    * Function imports necessary Deno/Supabase libraries (e.g., `cors.ts`, `supabase-js`, standard `http`).
    * Function correctly retrieves `AZURE_OPENAI_KEY` and `AZURE_OPENAI_ENDPOINT` from secrets/environment variables.
    * Function handles CORS preflight (`OPTIONS`) and main (`POST`) requests.
    * Function extracts the Supabase JWT from the `Authorization` header and authenticates the user request. Returns 401/403 if invalid/missing.
    * Function parses the incoming JSON request body, expecting `task` and `context` properties. Returns 400 if invalid.
    * Includes a basic `Workspace` call structure targeting the Azure OpenAI endpoint (placeholder for now, no actual prompt logic yet).
    * Returns a dummy JSON success response (`{"status": "ok"}`) or an error response (`{"error": "..."}`) with appropriate status codes (200, 400, 401, 500) and CORS headers.
    * Basic error handling (try/catch blocks) is implemented for key steps.
* **Dependencies:** Story 6, Story 15
* **Assignee:** Daniel
* **Estimated Effort:** L

**Story 17: Backend: Edge Function (ai_proxy) - Deployment**
* **Description:** As a Backend Developer, I need to deploy the initial version of the `ai_proxy` Edge Function to the Supabase project and verify its deployment status.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Edge Function Deployment (Section 8).
* **Acceptance Criteria:**
    * `supabase functions deploy ai_proxy --no-verify-jwt` (or include JWT verification based on Supabase client usage) command runs successfully.
    * The `ai_proxy` function appears as deployed in the Supabase Dashboard (Functions section).
    * Basic invocation (e.g., using curl or Postman with a valid user JWT) returns the expected dummy/error response.
* **Dependencies:** Story 16
* **Assignee:** Daniel
* **Estimated Effort:** S

---

## Epic 2: Frontend Foundation & Authentication (F1)

**Goal:** Set up the Expo mobile application project, install dependencies, configure Supabase client, establish basic navigation, and implement user authentication (Signup, Login, Logout).

**Story 18: [Enabler] Frontend Setup: Expo Project Init**
* **Description:** As a Frontend Developer, I need to create a new Expo project using the TypeScript template to establish the mobile app's foundation.
* **PRD Context:** Technology Stack (Section 9)
* **Architecture Context:** Mobile Application (Expo/React Native).
* **Acceptance Criteria:**
    * `npx create-expo-app gigconnect-ai -t expo-template-blank-typescript` command completes successfully.
    * A new directory `gigconnect-ai` is created with the Expo project structure.
    * The basic app runs successfully on a simulator/emulator (`npx expo start`).
* **Dependencies:** Story 3 (for Git repo), Story 4 (local env)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 19: [Enabler] Frontend Setup: Dependencies**
* **Description:** As a Frontend Developer, I need to install the necessary npm packages for Supabase integration, navigation, session persistence, and UI components.
* **PRD Context:** Technology Stack (Section 9)
* **Architecture Context:** Key Libraries (Section 2). Target file: `package.json`.
* **Acceptance Criteria:**
    * Packages `@supabase/supabase-js`, `react-native-url-polyfill`, `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs` (or chosen navigator), `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `@react-native-async-storage/async-storage` are installed via npm/yarn.
    * `package.json` and lock file are updated and committed.
    * The app still builds and runs after installation.
* **Dependencies:** Story 18
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 20: [Enabler] Frontend Setup: Supabase Client**
* **Description:** As a Frontend Developer, I need to create a reusable Supabase client instance configured with the project URL, anon key, and AsyncStorage for session persistence.
* **PRD Context:** NFR1 (Client-side keys are public `anon` key only), Technology Stack
* **Architecture Context:** Core Services (Supabase SDK integration). Target file: `src/lib/supabaseClient.ts`.
* **Acceptance Criteria:**
    * A `supabaseClient.ts` file is created (e.g., under `src/lib/`).
    * It imports `createClient` from `@supabase/supabase-js`.
    * It imports `AsyncStorage` from `@react-native-async-storage/async-storage`.
    * It initializes the client using the Supabase URL and `anon` key (from Story 1, potentially via environment variables - see Story 22).
    * It configures `auth: { storage: AsyncStorage, persistSession: true, ... }`.
    * The configured client instance is exported for use throughout the app.
* **Dependencies:** Story 1, Story 19, Story 22 (Env Vars)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 21: [Enabler] Frontend Setup: Basic Navigation**
* **Description:** As a Frontend Developer, I need to set up the basic navigation structure using React Navigation, defining placeholder screens for the main application flows (Auth vs. Main App).
* **PRD Context:** N/A (Structure)
* **Architecture Context:** UI/UX Structure (Section 11), React Navigation. Target files: `App.tsx` (or main entry), `src/navigation/` directory.
* **Acceptance Criteria:**
    * A root navigator is set up (e.g., in `App.tsx`).
    * A Stack Navigator for the Authentication flow (`AuthStack`) is created with placeholder screens `LoginScreen` and `SignupScreen`.
    * A Navigator for the Main App flow (`MainAppTabs` or `MainAppStack`) is created with placeholder screens (e.g., `DiscoveryScreen`, `PostGigScreen`, `ProfileScreen`).
    * Basic navigation between these flows (conditional rendering based on auth state - see Story 23) is planned or implemented structurally.
    * Placeholder screen components are created under `src/screens/`.
* **Dependencies:** Story 19
* **Assignee:** Sandisile
* **Estimated Effort:** L

**Story 22: [Enabler] Frontend Setup: Environment Variables**
* **Description:** As a Frontend Developer, I need to configure the Expo app to securely handle environment variables for the Supabase URL and anon key, ensuring sensitive keys are not committed to Git.
* **PRD Context:** NFR1
* **Architecture Context:** Client Configuration. Target file: `.env`, `app.json` (for plugins if needed), `.gitignore`.
* **Acceptance Criteria:**
    * A `.env` file is created at the project root.
    * Supabase URL (`EXPO_PUBLIC_SUPABASE_URL`) and anon key (`EXPO_PUBLIC_SUPABASE_ANON_KEY`) are added to `.env`. (Prefix `EXPO_PUBLIC_` is needed for Expo env vars).
    * `.env` file is added to `.gitignore`.
    * Environment variables are accessible within the application code (e.g., in `supabaseClient.ts`).
* **Dependencies:** Story 1
* **Assignee:** Xavier
* **Estimated Effort:** S

**Story 23: Frontend: Auth State Management**
* **Description:** As a Frontend Developer, I need to implement a simple global state management solution (e.g., React Context API or Zustand) to track the user's authentication status (session, user object) and make it accessible throughout the app.
* **PRD Context:** F1
* **Architecture Context:** Core Services (State Management). Target files: e.g., `src/context/AuthContext.tsx` or `src/store/authStore.ts`.
* **Acceptance Criteria:**
    * An auth provider/store is created.
    * It listens to Supabase auth state changes (`onAuthStateChange`).
    * It stores the current session and user object.
    * It provides the auth state and methods (like `setSession`, `setUser`) to the rest of the app.
    * The root of the app (`App.tsx`) is wrapped with the auth provider.
* **Dependencies:** Story 20
* **Assignee:** Sandisile
* **Estimated Effort:** L

**Story 24: Frontend: UI - Login Screen (F1.2)**
* **Description:** As a Frontend Developer, I need to create the user interface for the Login screen.
* **PRD Context:** F1.2
* **Architecture Context:** Auth Module, UI/UX Flow. Target file: `src/screens/LoginScreen.tsx`.
* **Acceptance Criteria:**
    * Screen contains input fields for Email and Password (using `TextInput`).
    * Password input hides characters.
    * Screen contains a "Login" button (`Button` or `TouchableOpacity`).
    * Screen contains a text link/button to navigate to the Signup screen.
    * Basic styling is applied for usability.
* **Dependencies:** Story 21
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 25: Frontend: Logic - Login (F1.2)**
* **Description:** As a Frontend Developer, I need to implement the login functionality using the Supabase client SDK when the user submits the login form.
* **PRD Context:** F1.2
* **Architecture Context:** Auth Module. Target file: `src/screens/LoginScreen.tsx`.
* **Acceptance Criteria:**
    * Login function is called on button press.
    * It retrieves email and password from component state.
    * It calls `supabase.auth.signInWithPassword()` with the credentials.
    * On success, the auth state (Story 23) is updated, triggering navigation to the main app flow (handled by Story 30).
    * On error, a user-friendly error message is displayed on the screen (e.g., "Invalid login credentials").
    * Loading state is indicated during the API call.
* **Dependencies:** Story 20, Story 23, Story 24
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 26: Frontend: UI - Signup Screen (F1.1)**
* **Description:** As a Frontend Developer, I need to create the user interface for the Signup screen.
* **PRD Context:** F1.1
* **Architecture Context:** Auth Module, UI/UX Flow. Target file: `src/screens/SignupScreen.tsx`.
* **Acceptance Criteria:**
    * Screen contains input fields for Email, Password, and Confirm Password.
    * Password inputs hide characters.
    * Screen contains a "Sign Up" button.
    * Screen contains a text link/button to navigate back to the Login screen.
    * Basic styling is applied.
* **Dependencies:** Story 21
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 27: Frontend: Logic - Signup (F1.1)**
* **Description:** As a Frontend Developer, I need to implement the signup functionality using the Supabase client SDK when the user submits the signup form.
* **PRD Context:** F1.1
* **Architecture Context:** Auth Module. Target file: `src/screens/SignupScreen.tsx`.
* **Acceptance Criteria:**
    * Signup function is called on button press.
    * Client-side validation ensures passwords match.
    * It retrieves email and password from component state.
    * It calls `supabase.auth.signUp()` with the credentials.
    * On success, a confirmation message is shown (e.g., "Check your email for confirmation link" or handle auto-login depending on Supabase settings). The user is typically navigated to Login or a confirmation pending screen.
    * On error (e.g., user already exists, weak password), a user-friendly error message is displayed.
    * Loading state is indicated.
* **Dependencies:** Story 20, Story 23, Story 26
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 28: Frontend: Logic - Logout (F1.3)**
* **Description:** As a Logged-in User, I want a way to log out of the application so that my session is terminated securely.
* **PRD Context:** F1.3
* **Architecture Context:** Auth Module. Target file: e.g., `src/screens/SettingsScreen.tsx` or a component in the main navigator.
* **Acceptance Criteria:**
    * A "Logout" button/link is available somewhere within the authenticated app flow.
    * Clicking Logout calls `supabase.auth.signOut()`.
    * On success, the auth state (Story 23) is cleared, triggering navigation back to the Login screen (handled by Story 30).
    * Errors during signout are handled (though less common).
* **Dependencies:** Story 20, Story 23, Story 30
* **Assignee:** Xavier
* **Estimated Effort:** S

**Story 29: Frontend: Session Persistence**
* **Description:** As a User, I want my login session to persist across app restarts so that I don't have to log in every time I open the app.
* **PRD Context:** N/A (Implicit usability)
* **Architecture Context:** Supabase Client configuration with AsyncStorage.
* **Acceptance Criteria:**
    * Log in successfully.
    * Close the application completely (kill the process).
    * Re-open the application.
    * The user is automatically directed to the main app flow without needing to log in again.
    * Log out, close, re-open. User is directed to the Login screen.
* **Dependencies:** Story 20, Story 23, Story 25
* **Assignee:** Sandisile (Verify during testing)
* **Estimated Effort:** S (Verification)

**Story 30: Frontend: Auth Flow Routing**
* **Description:** As a Frontend Developer, I need to implement the core routing logic that directs users to the appropriate screen/flow based on their authentication status and profile existence.
* **PRD Context:** F1, F2.1 (Implicit trigger)
* **Architecture Context:** Navigation Structure, Auth State Management. Target file: `App.tsx` or root navigator component.
* **Acceptance Criteria:**
    * On app load, check the auth state (Story 23).
    * If the user is not logged in, render the `AuthStack` navigator (Login/Signup screens).
    * If the user is logged in:
        * Check if a profile exists for the user in the `profiles` table (requires a quick DB check - implement in Story 37 first, or use a placeholder check initially).
        * If no profile exists, navigate to the `ProfileCreationChatScreen` (from Story 31).
        * If a profile exists, render the `MainAppTabs` (or main app navigator).
    * Handles the transition smoothly when auth state changes (login, logout).
* **Dependencies:** Story 21, Story 23, Story 25, Story 27, Story 37 (Profile Check)
* **Assignee:** Sandisile
* **Estimated Effort:** L

---

## Epic 3: Core AI Feature - Profile Creation (F2)

**Goal:** Implement the AI-powered conversational interface for creating user profiles, including backend AI interaction via the Edge Function and saving profile data.

**Story 31: Frontend: UI - Profile Chat Screen (F2.1)**
* **Description:** As a Frontend Developer, I need to create the basic user interface for the AI Profile Creation chat screen.
* **PRD Context:** F2.1
* **Architecture Context:** Profile Module UI. Target file: `src/screens/ProfileCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Screen displays a list of messages (e.g., using `FlatList`).
    * Screen includes a text input field for the user to type messages.
    * Screen includes a "Send" button to submit the user's message.
    * Basic styling differentiates user messages from AI messages (e.g., alignment, background color).
* **Dependencies:** Story 21
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 32: Frontend: State Management - Profile Chat (F2.2)**
* **Description:** As a Frontend Developer, I need to implement local component state management for the Profile Chat screen to handle the conversation history and the current user input.
* **PRD Context:** F2.2, AIR5
* **Architecture Context:** Profile Module, Client-side state management. Target file: `src/screens/ProfileCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Component state holds an array of messages (each message object could have `id`, `text`, `sender: 'user' | 'ai'`).
    * Component state holds the current text in the input field.
    * Functions exist to add new messages (user and AI) to the history array.
    * Functions exist to update the text input state.
* **Dependencies:** Story 31
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 33: Backend: Edge Function (ai_proxy) - Profile Task**
* **Description:** As a Backend Developer, I need to enhance the `ai_proxy` Edge Function to handle the `profile_creation_chat` task by constructing appropriate prompts for Azure OpenAI, calling the AI service, and processing the response to extract structured profile data.
* **PRD Context:** F2.2, F2.3, AIR1, AIR3, AIR4
* **Architecture Context:** `ai_proxy` Edge Function logic (Section 6). Target file: `supabase/functions/ai_proxy/index.ts`.
* **Acceptance Criteria:**
    * Function includes a specific `case` or `if` block for `task === "profile_creation_chat"`.
    * It retrieves conversation history and user input from the `context` object in the request body.
    * It constructs a system prompt and user messages for Azure OpenAI API, instructing the AI to:
        * Act as a friendly assistant creating a GigConnect profile.
        * Gather information about `skills`, `interests`, `availability`, and `location_area` (Midrand/Gauteng context).
        * Ask questions conversationally.
        * Output **both** a natural language response for the user **and** a JSON object containing the extracted structured data (`skills`: string[], `interests`: string[], `availability`: string, `location_area`: string) whenever data is gathered or updated.
    * It makes the `Workspace` call to the Azure OpenAI endpoint using the retrieved secrets (Story 6).
    * It parses the AI's response, separating the text reply from the JSON data.
    * It returns a JSON response containing `task`, `result: { ai_response: "...", extracted_data: {...} }`.
    * Handles potential errors during API call or response parsing.
* **Dependencies:** Story 16
* **Assignee:** Daniel
* **Estimated Effort:** L

**Story 34: Backend: Edge Function (ai_proxy) - Redeployment (Profile Task)**
* **Description:** As a Backend Developer, I need to deploy the updated `ai_proxy` Edge Function (including Profile Task logic) to Supabase.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Edge Function Deployment.
* **Acceptance Criteria:**
    * `supabase functions deploy ai_proxy` command runs successfully.
    * Deployment is confirmed in the Supabase Dashboard.
    * Testing confirms the new profile task logic is active.
* **Dependencies:** Story 33
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 35: Frontend: API Call - Profile Chat (F2.3)**
* **Description:** As a Frontend Developer, I need to implement the function within the Profile Chat screen to call the deployed `ai_proxy` Supabase Edge Function, sending the conversation context and handling the response.
* **PRD Context:** F2.3
* **Architecture Context:** Profile Module, Edge Function interaction. Target file: `src/screens/ProfileCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * An async function is created to handle sending messages.
    * It retrieves the current conversation history and the new user message from component state (Story 32).
    * It calls `supabase.functions.invoke('ai_proxy', { body: { task: 'profile_creation_chat', context: { conversation_history: [...], user_input: '...' } } })`.
    * It handles the response: extracting `ai_response` and `extracted_data`.
    * It updates the chat history with the AI's response (Story 32).
    * It stores/updates the accumulated extracted profile data in component state (Story 36).
    * Displays loading indicators while waiting for the response.
    * Displays user-friendly error messages if the function call fails (e.g., network error, function error response).
* **Dependencies:** Story 20 (Supabase client), Story 17 (Deployed function), Story 32, Story 34 (Deployed function with profile logic)
* **Assignee:** Themba
* **Estimated Effort:** L

**Story 36: Frontend: Logic - Profile Chat Interaction (F2.2, F2.3)**
* **Description:** As a Frontend Developer, I need to implement the interactive logic of the Profile Chat: sending user messages, displaying AI responses, accumulating extracted data, and determining conversation completion.
* **PRD Context:** F2.2, F2.3, AIR5
* **Architecture Context:** Profile Module logic. Target file: `src/screens/ProfileCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * When the user clicks "Send":
        * The user's message is added to the chat history UI.
        * The input field is cleared.
        * The API call function (Story 35) is triggered.
    * When the API call returns successfully:
        * The `ai_response` text is added to the chat history UI.
        * The `extracted_data` (if present) is merged/stored into a dedicated component state variable holding the profile-being-built.
    * A simple mechanism determines conversation end (e.g., AI sends a specific "completion" message or flag, or a "Save Profile" button is manually enabled/pressed by the user). For the hackathon, the AI confirming it has all needed info might be sufficient.
* **Dependencies:** Story 32, Story 35
* **Assignee:** Themba
* **Estimated Effort:** L

**Story 37: Frontend: DB Save - Profile (F2.4)**
* **Description:** As a Frontend Developer, I need to implement the function to save the final, accumulated profile data extracted during the AI chat to the `profiles` table in the Supabase database.
* **PRD Context:** F2.4
* **Architecture Context:** Profile Module, Supabase SDK DB interaction. Target file: `src/screens/ProfileCreationChatScreen.tsx` or a related service file.
* **Acceptance Criteria:**
    * A function `saveProfile` is created.
    * It retrieves the final accumulated profile data (skills, interests, availability, location) from component state (Story 36).
    * It retrieves the current user's ID from the auth state (Story 23).
    * It calls `supabase.from('profiles').insert({ user_id: userId, skills: ..., interests: ..., availability: ..., location_area: ... })`. (Note: `id` column typically uses the `user_id` directly if set up as PK referencing `auth.users`). Check DB schema from Story 8. If `id` needs to be separate, adjust accordingly.
    * Handles success (triggers navigation - Story 38).
    * Handles potential errors during the insert operation (e.g., RLS violation, database error) and displays feedback.
    * This function is called upon conversation completion (Story 36).
* **Dependencies:** Story 8 (DB Schema), Story 11 (DB Applied), Story 12 (RLS), Story 20 (Supabase client), Story 23 (Auth state), Story 36 (Accumulated data)
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 38: Frontend: Navigation - Profile Completion**
* **Description:** As a Frontend Developer, I need to ensure that after successfully saving the user's profile, the application navigates the user to the main application flow (e.g., the Gig Discovery screen).
* **PRD Context:** Implicit flow after F2.4
* **Architecture Context:** Navigation. Target file: `src/screens/ProfileCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Upon successful completion of the `saveProfile` function (Story 37), the navigation logic triggers.
    * The user is navigated away from the `ProfileCreationChatScreen` to the main app navigator (e.g., `DiscoveryScreen`). This might involve resetting the navigation stack.
* **Dependencies:** Story 21 (Nav setup), Story 37 (Save success)
* **Assignee:** Themba
* **Estimated Effort:** S

---

## Epic 4: Core AI Feature - Gig Creation & Pricing (F3, F4)

**Goal:** Implement the AI-powered conversational interface for creating gigs, enforcing the R1000 limit, getting AI price recommendations, setting the final price, and saving the gig data.

**Story 39: Frontend: UI - Gig Chat Screen (F3.1)**
* **Description:** As a Frontend Developer, I need to create the user interface for the AI Gig Creation chat screen, similar in structure to the Profile Chat screen.
* **PRD Context:** F3.1
* **Architecture Context:** Gig Module UI. Target file: `src/screens/GigCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Screen displays a list of messages (`FlatList`).
    * Screen includes a text input field.
    * Screen includes a "Send" button.
    * Basic styling differentiates user/AI messages.
    * An entry point (e.g., a "Post Gig" button on the main navigator/Discovery screen) navigates to this screen.
* **Dependencies:** Story 21 (Nav setup)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 40: Frontend: State Management - Gig Chat (F3.2)**
* **Description:** As a Frontend Developer, I need to implement local component state management for the Gig Chat screen to handle the conversation history and user input.
* **PRD Context:** F3.2, AIR5
* **Architecture Context:** Gig Module, Client-side state management. Target file: `src/screens/GigCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Component state holds an array of messages (`id`, `text`, `sender`).
    * Component state holds the current text input value.
    * Functions exist to manage message history and input state.
* **Dependencies:** Story 39
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 41: Backend: Edge Function (ai_proxy) - Gig Task**
* **Description:** As a Backend Developer, I need to enhance the `ai_proxy` Edge Function to handle the `gig_creation_chat` task, prompting the AI to gather gig details (title, description, location, skills) while considering the R1000 limit, and extracting structured gig data.
* **PRD Context:** F3.2, F3.3 (AI Awareness), F3.4, AIR1, AIR3, AIR4
* **Architecture Context:** `ai_proxy` Edge Function logic (Section 6). Target file: `supabase/functions/ai_proxy/index.ts`.
* **Acceptance Criteria:**
    * Function includes a specific `case` or `if` block for `task === "gig_creation_chat"`.
    * It retrieves conversation history and user input from `context`.
    * It constructs prompts for Azure OpenAI instructing it to:
        * Act as an assistant posting a GigConnect gig.
        * Gather `title`, `description`, `location_area` (Gauteng context), and optionally `skills_required`.
        * Mention the R1000 ZAR maximum value constraint during the conversation.
        * Output **both** a natural language response **and** a JSON object with extracted structured data (`title`: string, `description`: string, `location_area`: string, `skills_required`: string[]).
    * It calls the Azure OpenAI API.
    * It parses the AI response (text reply + JSON data).
    * It returns a JSON response containing `task`, `result: { ai_response: "...", extracted_data: {...} }`.
    * Handles errors.
* **Dependencies:** Story 16, Story 33 (reuse structure)
* **Assignee:** Daniel
* **Estimated Effort:** L

**Story 42: Backend: Edge Function (ai_proxy) - Redeployment (Gig Task)**
* **Description:** As a Backend Developer, I need to deploy the updated `ai_proxy` Edge Function (including Gig Task logic) to Supabase.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Edge Function Deployment.
* **Acceptance Criteria:**
    * `supabase functions deploy ai_proxy` runs successfully.
    * Deployment confirmed. Testing confirms new gig task logic.
* **Dependencies:** Story 41
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 43: Frontend: API Call - Gig Chat (F3.4)**
* **Description:** As a Frontend Developer, I need to implement the function within the Gig Chat screen to call the `ai_proxy` Edge Function for the `gig_creation_chat` task.
* **PRD Context:** F3.4
* **Architecture Context:** Gig Module, Edge Function interaction. Target file: `src/screens/GigCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * An async function sends messages.
    * It calls `supabase.functions.invoke('ai_proxy', { body: { task: 'gig_creation_chat', context: { conversation_history: [...], user_input: '...' } } })`.
    * It handles the response: extracting `ai_response` and `extracted_data`.
    * Updates chat history and accumulated gig data state (Story 40, Story 44).
    * Handles loading and error states.
* **Dependencies:** Story 20, Story 17, Story 40, Story 42 (Deployed function with gig logic)
* **Assignee:** Sandisile
* **Estimated Effort:** L

**Story 44: Frontend: Logic - Gig Chat Interaction (F3.2, F3.4)**
* **Description:** As a Frontend Developer, I need to implement the interactive logic of the Gig Chat: sending user messages, displaying AI responses, accumulating extracted gig data, and determining conversation completion.
* **PRD Context:** F3.2, F3.4, AIR5
* **Architecture Context:** Gig Module logic. Target file: `src/screens/GigCreationChatScreen.tsx`.
* **Acceptance Criteria:**
    * Handles user message submission (add to UI, clear input, trigger API call - Story 43).
    * Handles successful API response (add AI response to UI, merge/store `extracted_data` into gig-being-built state).
    * Determines conversation end (e.g., AI confirms all details gathered, or manual user action).
* **Dependencies:** Story 40, Story 43
* **Assignee:** Sandisile
* **Estimated Effort:** L

**Story 45: Frontend: Logic - R1000 Limit Check (F3.3)**
* **Description:** As a Frontend Developer, I need to ensure the R1000 ZAR gig value scope is communicated and potentially checked *before* proceeding to save the gig, although the primary enforcement happens at the price setting stage (F4.4).
* **PRD Context:** F3.3 (Critical)
* **Architecture Context:** Gig Module Logic. Target file: `src/screens/GigCreationChatScreen.tsx` (potentially just informational text) and `src/screens/PriceRecommendationScreen.tsx` (hard validation).
* **Acceptance Criteria:**
    * The AI prompt (Story 41) includes instructions to mention the R1000 limit.
    * (Optional, if time) Add client-side reminder text during the chat or before navigating to price setting.
    * **Crucially:** The primary enforcement logic will be in Story 50 (Set Final Price). This story ensures awareness.
* **Dependencies:** Story 41 (AI prompt), Story 50 (where enforcement happens)
* **Assignee:** Daniel (ensure prompt in Story 41) / Sandisile (client-side reminder if added)
* **Estimated Effort:** XS (mostly covered by prompt and Story 50)

**Story 46: Backend: Edge Function (ai_proxy) - Price Task**
* **Description:** As a Backend Developer, I need to enhance the `ai_proxy` Edge Function to handle the `price_recommendation` task, prompting the AI for a fair price range based on the gig description.
* **PRD Context:** F4.2 (Critical), AIR1, AIR3
* **Architecture Context:** `ai_proxy` Edge Function logic (Section 6). Target file: `supabase/functions/ai_proxy/index.ts`.
* **Acceptance Criteria:**
    * Function includes a `case` or `if` block for `task === "price_recommendation"`.
    * It retrieves the `gig_description` from the `context`.
    * It constructs a prompt for Azure OpenAI asking for a suggested price *range* in ZAR, specifying the context (Gauteng, small gig, <= R1000 limit). Request JSON output if possible, e.g., `{"min_price": 50, "max_price": 100}`.
    * It calls the Azure OpenAI API.
    * It parses the AI response to extract the price range (e.g., `[min, max]` or `{min_price, max_price}`).
    * It returns a JSON response containing `task`, `result: { price_range_zar: [min, max] }`.
    * Handles errors, including cases where the AI might not return a parseable range.
* **Dependencies:** Story 16, Story 41 (reuse structure)
* **Assignee:** Daniel
* **Estimated Effort:** M

**Story 47: Backend: Edge Function (ai_proxy) - Redeployment (Price Task)**
* **Description:** As a Backend Developer, I need to deploy the updated `ai_proxy` Edge Function (including Price Task logic) to Supabase.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Edge Function Deployment.
* **Acceptance Criteria:**
    * `supabase functions deploy ai_proxy` runs successfully.
    * Deployment confirmed. Testing confirms new price task logic.
* **Dependencies:** Story 46
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 48: Frontend: UI - Price Recommendation Screen (F4.3)**
* **Description:** As a Frontend Developer, I need to create a simple screen or modal to display the AI-suggested price range and allow the user to input/confirm the final gig price.
* **PRD Context:** F4.3, F4.4
* **Architecture Context:** Gig Module UI. Target file: `src/screens/PriceRecommendationScreen.tsx` (or modal component).
* **Acceptance Criteria:**
    * Screen displays the AI-suggested price range (e.g., "Suggested: R50 - R100").
    * Screen includes a numeric input field for the user to enter the final price (ZAR).
    * Screen includes a "Confirm and Post Gig" button.
    * Displays the gig title/description contextually.
* **Dependencies:** Story 21 (Nav setup)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 49: Frontend: API Call - Price Rec (F4.2)**
* **Description:** As a Frontend Developer, I need to implement the function call to the `ai_proxy` Edge Function (task: `price_recommendation`) after the gig creation chat is complete, passing the extracted gig description.
* **PRD Context:** F4.1, F4.2
* **Architecture Context:** Gig Module, Edge Function interaction. Target file: Logic triggered after Story 44 completes, likely navigating to `PriceRecommendationScreen`.
* **Acceptance Criteria:**
    * After gig chat completion (Story 44), retrieve the extracted gig description.
    * Navigate to the `PriceRecommendationScreen` (Story 48), passing the accumulated gig data (title, desc, location, skills) and triggering the API call.
    * An async function calls `supabase.functions.invoke('ai_proxy', { body: { task: 'price_recommendation', context: { gig_description: '...' } } })`.
    * Handles the response, extracting `price_range_zar`.
    * Displays the fetched range on the `PriceRecommendationScreen` (Story 48).
    * Handles loading and error states (e.g., show "Could not get recommendation" if fails).
* **Dependencies:** Story 20, Story 17, Story 44 (Gig data), Story 47 (Deployed function with price logic), Story 48 (UI to display result)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 50: Frontend: Logic - Set Final Price (F4.4)**
* **Description:** As a Frontend Developer, I need to implement the logic on the Price Recommendation screen to allow the user to input a final price, enforcing the R1000 ZAR limit.
* **PRD Context:** F4.4 (Critical), NFR7
* **Architecture Context:** Gig Module Logic. Target file: `src/screens/PriceRecommendationScreen.tsx`.
* **Acceptance Criteria:**
    * User can enter a numeric value into the price input field (Story 48).
    * Input validation prevents non-numeric characters.
    * **Client-side validation MUST enforce that the entered price is > 0 and <= 1000.00.**
    * Display a validation error message if the price is outside the valid range (0 < price <= 1000).
    * The "Confirm and Post Gig" button is disabled until a valid price is entered.
    * The confirmed final price is stored in component state, ready for saving (Story 51).
* **Dependencies:** Story 48 (UI)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 51: Frontend: DB Save - Gig (F3.5, F4.4)**
* **Description:** As a Frontend Developer, I need to implement the function to save the complete gig data (including the final confirmed price) to the `gigs` table in Supabase when the user confirms on the Price Recommendation screen.
* **PRD Context:** F3.5, F4.4
* **Architecture Context:** Gig Module, Supabase SDK DB interaction. Target file: `src/screens/PriceRecommendationScreen.tsx` or related service.
* **Acceptance Criteria:**
    * A function `saveGig` is triggered on "Confirm and Post Gig" button press.
    * It retrieves the accumulated gig data (title, description, location, skills from Story 44) and the final validated price (Story 50).
    * It retrieves the current user's ID (Story 23).
    * It calls `supabase.from('gigs').insert({ poster_user_id: userId, title: ..., description: ..., location_area: ..., skills_required: ..., price_zar: finalPrice, status: 'open' })`.
    * Handles success (triggers navigation - Story 52).
    * Handles potential errors (RLS, DB constraint like price > 1000 if DB constraint exists, network errors) and displays feedback.
* **Dependencies:** Story 9 (DB Schema), Story 11 (DB Applied), Story 13 (RLS), Story 20, Story 23, Story 44 (Gig data), Story 50 (Final price)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 52: Frontend: Navigation - Gig Completion**
* **Description:** As a Frontend Developer, I need to ensure that after successfully saving the gig, the user is navigated away from the gig creation flow, typically back to the Gig Discovery screen.
* **PRD Context:** Implicit flow after F3.5/F4.4
* **Architecture Context:** Navigation. Target file: `src/screens/PriceRecommendationScreen.tsx`.
* **Acceptance Criteria:**
    * Upon successful completion of the `saveGig` function (Story 51), navigation is triggered.
    * User is navigated back to a main screen like `DiscoveryScreen`. The creation flow screens (Chat, Price) should be removed from the navigation stack.
* **Dependencies:** Story 21, Story 51
* **Assignee:** Sandisile
* **Estimated Effort:** S

---

## Epic 5: Core User Flow - Discovery & Details (F5, F7)

**Goal:** Implement the swipeable gig discovery interface, the ability to 'like' gigs, and the screen to view detailed gig information.

**Story 53: [Enabler] Frontend: Dependency - Swipe Cards**
* **Description:** As a Frontend Developer, I need to install and perform basic configuration/setup for the chosen swipeable card library (`react-native-deck-swiper` or alternative).
* **PRD Context:** F5, Technology Stack
* **Architecture Context:** Discovery Module UI Library. Target file: `package.json`, potentially requires `react-native-gesture-handler` setup verification (done in Story 19).
* **Acceptance Criteria:**
    * `react-native-deck-swiper` (or chosen alternative) is installed via npm/yarn.
    * Basic import and usage in a test component doesn't cause build errors.
* **Dependencies:** Story 19
* **Assignee:** Themba
* **Estimated Effort:** S

**Story 54: Frontend: UI - Gig Discovery Screen (F5.1)**
* **Description:** As a Frontend Developer, I need to create the main UI for the Gig Discovery screen, integrating the swipeable deck component and designing a basic gig card template.
* **PRD Context:** F5.1
* **Architecture Context:** Discovery Module UI. Target file: `src/screens/DiscoveryScreen.tsx`, `src/components/GigCard.tsx`.
* **Acceptance Criteria:**
    * `DiscoveryScreen.tsx` is created and integrated into the main navigation (Story 21).
    * It imports and renders the `react-native-deck-swiper` component.
    * A separate `GigCard.tsx` component is created to define the appearance of each card.
    * The initial card template displays placeholder text for Title, Price, and Location Area.
    * The swiper component is configured with basic props (e.g., pointing to the card data array, renderCard function).
* **Dependencies:** Story 21 (Nav setup), Story 53 (Swiper lib)
* **Assignee:** Themba
* **Estimated Effort:** L

**Story 55: Frontend: DB Fetch - Gigs for Discovery (F5.1)**
* **Description:** As a Frontend Developer, I need to implement the function to fetch open gigs from the Supabase `gigs` table to populate the discovery screen.
* **PRD Context:** F5.1
* **Architecture Context:** Discovery Module, Supabase SDK DB interaction. Target file: `src/screens/DiscoveryScreen.tsx` or related service.
* **Acceptance Criteria:**
    * An async function `WorkspaceGigs` is created.
    * It calls `supabase.from('gigs').select('*').eq('status', 'open').neq('poster_user_id', currentUserId).limit(10)` (or similar query - fetch open gigs not posted by the current user, limit results).
    * Requires getting the current user's ID (Story 23).
    * Handles success: stores the fetched gig data in component state (Story 56).
    * Handles errors (e.g., network, RLS issues) and potentially updates UI state.
    * Function is called when the screen mounts (e.g., `useEffect`).
* **Dependencies:** Story 9 (DB Schema), Story 11 (DB Applied), Story 13 (RLS), Story 20, Story 23
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 56: Frontend: Logic - Display Gigs (F5.1)**
* **Description:** As a Frontend Developer, I need to load the fetched gig data into the deck swiper state and handle the case where no gigs are available.
* **PRD Context:** F5.1
* **Architecture Context:** Discovery Module Logic. Target file: `src/screens/DiscoveryScreen.tsx`.
* **Acceptance Criteria:**
    * Component state holds the array of gigs fetched by Story 55.
    * This state array is passed to the `cards` prop of the deck swiper.
    * The `renderCard` function uses the data for the current card to populate the `GigCard` component (Story 57).
    * If the fetched gig array is initially empty or becomes empty, a message like "No available gigs found." is displayed instead of the swiper.
    * Handles loading state while gigs are being fetched initially.
* **Dependencies:** Story 54 (UI), Story 55 (Data fetching), Story 57 (Card details)
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 57: Frontend: UI - Gig Card Details**
* **Description:** As a Frontend Developer, I need to enhance the `GigCard` component to clearly display the relevant gig information fetched from the database.
* **PRD Context:** F5.1 (Implied)
* **Architecture Context:** Discovery Module UI Component. Target file: `src/components/GigCard.tsx`.
* **Acceptance Criteria:**
    * The `GigCard` component accepts a `gig` object as a prop.
    * It displays the `gig.title`, `gig.price_zar` (formatted as currency, e.g., "R100.00"), and `gig.location_area`.
    * Optionally displays the first line of `gig.description` or `gig.skills_required` if space permits.
    * Layout and styling make the information clear and readable within the card format.
* **Dependencies:** Story 54 (Basic card structure)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 58: Frontend: DB Save - Like Gig (F5.2)**
* **Description:** As a User swiping gigs, I want to swipe right to indicate interest, saving the gig to a personal list.
* **PRD Context:** F5.2
* **Architecture Context:** Discovery Module Logic, Supabase SDK DB interaction. Target file: `src/screens/DiscoveryScreen.tsx`.
* **Acceptance Criteria:**
    * The `onSwipedRight` prop of the deck swiper is implemented.
    * The handler function gets the `gig_id` of the swiped card.
    * It gets the current `user_id` (Story 23).
    * It calls `supabase.from('liked_gigs').insert({ user_id: userId, gig_id: gigId })`.
    * Handles potential errors gracefully (e.g., unique constraint violation if the user swipes right on the same gig twice - can use `.upsert()` or ignore error).
    * Provides some minimal feedback (optional, e.g., console log) on success/failure.
* **Dependencies:** Story 10 (DB Schema), Story 11 (DB Applied), Story 14 (RLS), Story 20, Story 23, Story 54 (Swiper setup)
* **Assignee:** Themba
* **Estimated Effort:** M

**Story 59: Frontend: Logic - Dismiss Gig (F5.3)**
* **Description:** As a User swiping gigs, I want to swipe left to dismiss a gig I'm not interested in, so it's removed from my current view.
* **PRD Context:** F5.3
* **Architecture Context:** Discovery Module Logic. Target file: `src/screens/DiscoveryScreen.tsx`.
* **Acceptance Criteria:**
    * The `onSwipedLeft` prop of the deck swiper is implemented.
    * The handler function identifies the swiped card.
    * For MVP, simply allowing the card to be removed by the swiper library is sufficient. No backend action is required for dismissal in this phase.
    * (Optional Post-MVP/Time Permitting): Track dismissed IDs in local state/storage to prevent them from reappearing if more gigs are fetched (Story 60).
* **Dependencies:** Story 54
* **Assignee:** Themba
* **Estimated Effort:** XS

**Story 60: Frontend: Logic - Fetch More Gigs (F5.4)**
* **Description:** As a User swiping gigs, I want the app to automatically fetch more gigs when I run out of the initial set, so I can continue discovering opportunities.
* **PRD Context:** F5.4
* **Architecture Context:** Discovery Module Logic. Target file: `src/screens/DiscoveryScreen.tsx`.
* **Acceptance Criteria:**
    * Implement the `onSwipedAll` prop of the deck swiper OR track the current card index in `onSwiped` handlers.
    * When the user is nearing the end of the current card batch (e.g., 2-3 cards left or `onSwipedAll`), trigger the `WorkspaceGigs` function (Story 55) again.
    * Modify `WorkspaceGigs` to support pagination (e.g., using `.range(from, to)` in the Supabase query) or simply fetch the next batch.
    * Append newly fetched gigs to the existing gig array in the component state.
    * (Important Consideration for MVP): Avoid refetching already seen/swiped gigs. Simplest MVP approach might be to just fetch the next batch without complex filtering, accepting potential duplicates if user goes back/forth (unlikely with swiper). A more robust solution would track seen `gig_id`s. *Decision: Keep it simple for hackathon - fetch next batch without filtering seen IDs unless trivial.*
* **Dependencies:** Story 55 (fetch logic), Story 56 (state management)
* **Assignee:** Themba
* **Estimated Effort:** M (Potentially L if filtering seen IDs is attempted)

**Story 61: Frontend: UI - Gig Details Screen (F7.1)**
* **Description:** As a Frontend Developer, I need to create a new screen to display the full details of a selected gig.
* **PRD Context:** F7.1
* **Architecture Context:** Gig Details Module UI. Target file: `src/screens/GigDetailsScreen.tsx`.
* **Acceptance Criteria:**
    * `GigDetailsScreen.tsx` is created.
    * It's added to the navigation stack (e.g., within the Main App stack).
    * The screen structure includes areas to display Title, Price, Location, Full Description, Required Skills, and a "Suggest Steps" button (placeholder for now).
    * Basic layout and styling are applied.
* **Dependencies:** Story 21
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 62: Frontend: Navigation - To Gig Details (F7.1)**
* **Description:** As a User, I want to tap on a gig card (in Discovery or Suggestions) to navigate to its full details screen.
* **PRD Context:** F7.1
* **Architecture Context:** Navigation, Discovery Module, Suggestions Module (later). Target file: `src/components/GigCard.tsx` (making it tappable), `src/screens/DiscoveryScreen.tsx` (handling navigation), `src/screens/SuggestionsScreen.tsx` (later).
* **Acceptance Criteria:**
    * Wrap the `GigCard` component in a `TouchableOpacity` or similar.
    * Implement the `onPress` handler for the card.
    * The handler uses the navigation prop to navigate to the `GigDetailsScreen` (Story 61).
    * **Crucially:** The `gig.id` of the selected gig MUST be passed as a route parameter to the `GigDetailsScreen`.
* **Dependencies:** Story 54, Story 57, Story 61
* **Assignee:** Themba
* **Estimated Effort:** S

**Story 63: Frontend: DB Fetch - Single Gig (F7.2)**
* **Description:** As a Frontend Developer, I need to implement the logic on the Gig Details screen to fetch the full details of the specific gig using its ID passed via navigation parameters.
* **PRD Context:** F7.2
* **Architecture Context:** Gig Details Module, Supabase SDK DB interaction. Target file: `src/screens/GigDetailsScreen.tsx`.
* **Acceptance Criteria:**
    * Retrieve the `gig_id` from the route parameters (`route.params.gigId`).
    * Implement an async function `WorkspaceGigDetails`.
    * Call `supabase.from('gigs').select('*').eq('id', gigId).single()`. `.single()` conveniently returns one object or null/error.
    * Handle success: store the fetched gig object in component state.
    * Handle cases where the gig is not found (e.g., `.single()` returns null or error).
    * Handles other errors (network, RLS).
    * Function is called when the screen mounts, using the `gigId` from params.
* **Dependencies:** Story 9, Story 11, Story 13, Story 20, Story 61, Story 62 (passing gigId)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 64: Frontend: Logic - Display Gig Details (F7.2)**
* **Description:** As a Frontend Developer, I need to display the fetched gig details on the Gig Details screen and include the placeholder button for milestone suggestions.
* **PRD Context:** F7.2, F8.1 (Button)
* **Architecture Context:** Gig Details Module Logic & UI binding. Target file: `src/screens/GigDetailsScreen.tsx`.
* **Acceptance Criteria:**
    * Display loading state while data is being fetched (Story 63).
    * If fetching fails or gig not found, display an appropriate error message.
    * If successful, display the `gig.title`, `gig.description` (full text), `gig.price_zar` (formatted), `gig.location_area`, and `gig.skills_required` (formatted nicely, e.g., comma-separated or list) from the fetched gig data.
    * A button with the text "Suggest Steps" (or similar) is displayed. Initially, it doesn't need to do anything.
* **Dependencies:** Story 61 (UI Structure), Story 63 (Data fetching)
* **Assignee:** Xavier
* **Estimated Effort:** M

---

## Epic 6: Supporting AI & Info Features (F6, F8, F9)

**Goal:** Implement the basic AI gig suggestions, AI milestone suggestions on the gig details page, and the informational content screen.

**Story 65: Frontend: UI - AI Gig Suggestions Screen (F6.1)**
* **Description:** As a Frontend Developer, I need to create a new screen or a dedicated section (e.g., a Tab) to display suggested gigs to the user.
* **PRD Context:** F6.1
* **Architecture Context:** Discovery Module (Suggestions part). Target file: `src/screens/SuggestionsScreen.tsx`.
* **Acceptance Criteria:**
    * `SuggestionsScreen.tsx` is created.
    * It's added to the main navigation (e.g., as a tab alongside Discovery).
    * The UI uses a simple layout (e.g., `FlatList` or mapping over data) to render a list/grid of suggested gigs.
    * It can reuse the `GigCard` component (Story 57) to display each suggestion.
* **Dependencies:** Story 21 (Nav), Story 57 (Gig Card)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 66: Frontend: DB Fetch - Profile Data for Suggestions**
* **Description:** As a Frontend Developer, I need to fetch the current user's profile data (specifically skills, interests, location) to potentially use for matching suggestions.
* **PRD Context:** F6.2
* **Architecture Context:** Suggestions Logic, Supabase SDK DB interaction. Target file: `src/screens/SuggestionsScreen.tsx`.
* **Acceptance Criteria:**
    * An async function `WorkspaceUserProfile` is implemented.
    * It gets the current `user_id` (Story 23).
    * It calls `supabase.from('profiles').select('skills, interests, location_area').eq('user_id', userId).single()`.
    * Handles success: stores the fetched profile data in component state.
    * Handles errors/profile not found.
    * Function is called when the Suggestions screen mounts.
* **Dependencies:** Story 8, Story 11, Story 12, Story 20, Story 23, Story 37 (Profile needs to exist)
* **Assignee:** Daniel
* **Estimated Effort:** M

**Story 67: Frontend: DB Query - Basic Gig Suggestions (F6.2)**
* **Description:** As a Frontend Developer, I need to implement a *basic* Supabase query to fetch potentially relevant open gigs based on minimal matching criteria (or none for simplest MVP).
* **PRD Context:** F6.2 (High Priority, but simplify for MVP)
* **Architecture Context:** Suggestions Logic, Supabase SDK DB query. Target file: `src/screens/SuggestionsScreen.tsx`.
* **Acceptance Criteria:**
    * An async function `WorkspaceSuggestedGigs` is implemented.
    * **MVP Simplification (Option A):** Query fetches all `open` gigs NOT posted by the current user, ordered by `created_at` descending, limited results. `supabase.from('gigs').select('*').eq('status', 'open').neq('poster_user_id', currentUserId).order('created_at', { ascending: false }).limit(20)`.
    * *(Stretch Goal - Option B - Only if time permits):* Attempt basic matching using profile data (Story 66). Requires more complex query involving filters on `location_area` or array overlap on `skills_required` vs `profile.skills` (e.g., using `.or()` / `.filter()` with array operators like `cs` contains). *Stick to Option A for Hackathon.*
    * Handles success: stores fetched suggestions in component state.
    * Handles errors.
    * Function is called after profile data is fetched (Story 66).
* **Dependencies:** Story 9, Story 11, Story 13, Story 20, Story 23, Story 66 (Profile data needed for User ID, potentially for filtering in Option B)
* **Assignee:** Daniel
* **Estimated Effort:** M (for Option A), L (for Option B) - **Target M (Option A)**

**Story 68: Frontend: Logic - Display Suggestions (F6.3)**
* **Description:** As a Frontend Developer, I need to display the fetched suggested gigs on the Suggestions screen, allowing users to tap them to view details.
* **PRD Context:** F6.3
* **Architecture Context:** Suggestions Logic & UI Binding. Target file: `src/screens/SuggestionsScreen.tsx`.
* **Acceptance Criteria:**
    * Display loading state while profile/suggestions are fetched.
    * If fetching fails or no suggestions found, display an appropriate message.
    * Use the fetched suggestions data (Story 67) to render a list of `GigCard` components (Story 57).
    * Each rendered `GigCard` is tappable and navigates to the `GigDetailsScreen` (Story 61), passing the correct `gig.id` (reusing logic from Story 62).
* **Dependencies:** Story 57 (Gig Card), Story 62 (Nav logic), Story 65 (UI Structure), Story 67 (Data fetching)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 69: Backend: Edge Function (ai_proxy) - Milestone Task**
* **Description:** As a Backend Developer, I need to enhance the `ai_proxy` Edge Function to handle the `milestone_suggestion` task, prompting the AI to suggest potential steps for completing a given gig description.
* **PRD Context:** F8.2 (High Priority), AIR1, AIR3
* **Architecture Context:** `ai_proxy` Edge Function logic. Target file: `supabase/functions/ai_proxy/index.ts`.
* **Acceptance Criteria:**
    * Function includes a `case` or `if` block for `task === "milestone_suggestion"`.
    * It retrieves the `gig_description` from the `context`.
    * It constructs a prompt for Azure OpenAI asking for a short list (e.g., 3-5) of simple, actionable steps or milestones to complete the described task. Request JSON output if possible, e.g., `{"milestones": ["Step 1", "Step 2", ...]}`.
    * It calls the Azure OpenAI API.
    * It parses the AI response to extract the list of milestones.
    * It returns a JSON response containing `task`, `result: { suggested_milestones: [...] }`.
    * Handles errors.
* **Dependencies:** Story 16, Story 46 (reuse structure)
* **Assignee:** Daniel
* **Estimated Effort:** M

**Story 70: Backend: Edge Function (ai_proxy) - Redeployment (Milestone Task)**
* **Description:** As a Backend Developer, I need to deploy the updated `ai_proxy` Edge Function (including Milestone Task logic) to Supabase.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Edge Function Deployment.
* **Acceptance Criteria:**
    * `supabase functions deploy ai_proxy` runs successfully.
    * Deployment confirmed. Testing confirms new milestone task logic.
* **Dependencies:** Story 69
* **Assignee:** Daniel
* **Estimated Effort:** S

**Story 71: Frontend: API Call - Milestones (F8.2)**
* **Description:** As a Frontend Developer, I need to implement the function called when the "Suggest Steps" button on the Gig Details screen is tapped, which calls the `ai_proxy` for the `milestone_suggestion` task.
* **PRD Context:** F8.1, F8.2
* **Architecture Context:** Milestone Module interaction (within Gig Details), Edge Function interaction. Target file: `src/screens/GigDetailsScreen.tsx`.
* **Acceptance Criteria:**
    * An async function `WorkspaceMilestones` is created.
    * It's attached to the `onPress` handler of the "Suggest Steps" button (from Story 64).
    * It retrieves the `gig.description` from the fetched gig data state (Story 63).
    * It calls `supabase.functions.invoke('ai_proxy', { body: { task: 'milestone_suggestion', context: { gig_description: '...' } } })`.
    * Handles the response: extracting `suggested_milestones`.
    * Updates component state to store the fetched milestones (Story 72).
    * Manages loading state during the call.
    * Handles errors from the function call.
* **Dependencies:** Story 20, Story 17, Story 63 (Gig Description), Story 64 (Button), Story 70 (Deployed function with milestone logic)
* **Assignee:** Sandisile
* **Estimated Effort:** M

**Story 72: Frontend: UI/Logic - Display Milestones (F8.3)**
* **Description:** As a Frontend Developer, I need to display the AI-generated suggested milestones clearly on the Gig Details screen (or in a modal) after they are fetched.
* **PRD Context:** F8.3
* **Architecture Context:** Milestone Module display (within Gig Details). Target file: `src/screens/GigDetailsScreen.tsx`.
* **Acceptance Criteria:**
    * Component state holds the fetched milestones array (from Story 71).
    * Conditionally render a section/modal titled "Suggested Steps" when milestones are available or being loaded.
    * Display the loading state while fetching milestones.
    * If fetching fails, display an error message.
    * If successful, display the `suggested_milestones` array as a numbered or bulleted list.
    * Frame the output clearly as "suggestions".
* **Dependencies:** Story 61 (UI structure), Story 71 (Fetching milestones)
* **Assignee:** Xavier
* **Estimated Effort:** M

**Story 73: Frontend: UI - Informational Screen (F9.1)**
* **Description:** As a Frontend Developer, I need to create a new screen to display important informational content (SA Labour Law context, NPO info, disclaimer).
* **PRD Context:** F9.1
* **Architecture Context:** Informational Module UI. Target file: `src/screens/InfoScreen.tsx`.
* **Acceptance Criteria:**
    * `InfoScreen.tsx` is created.
    * It's added to the navigation (e.g., accessible from a Settings menu or Tab).
    * Screen includes structure (e.g., `ScrollView`, `Text`, `View`) to hold the required text content and links.
* **Dependencies:** Story 21
* **Assignee:** Xavier
* **Estimated Effort:** S

**Story 74: Frontend: Content - Info Screen (F9.2, F9.3, F9.4, F9.5)**
* **Description:** As a Frontend Developer, I need to add the specific static text content and clickable external links to the Informational Screen.
* **PRD Context:** F9.2 (Critical), F9.3 (Critical), F9.4 (Critical), F9.5 (High)
* **Architecture Context:** Informational Module Content. Target file: `src/screens/InfoScreen.tsx`. Use React Native `Linking` API.
* **Acceptance Criteria:**
    * Add text explaining the general distinction between independent contractors and employees in SA (per PRD).
    * Add text stating the platform connects independent parties.
    * Add clickable links (using `Linking.openURL`) to official Dept. of Employment and Labour and SARS resources regarding independent contractors. **Ensure links are accurate.**
    * Add a clear disclaimer that the app does not provide legal or tax advice.
    * Add brief text outlining the potential value for local NPOs/NGOs.
    * Content is formatted for readability (headings, paragraphs).
* **Dependencies:** Story 73 (Screen structure)
* **Assignee:** Xavier
* **Estimated Effort:** M

---

## Epic 7: Testing & Deployment Prep

**Goal:** Conduct essential manual testing of the core user flows, perform basic edge case testing, set up for EAS builds, and clean up the codebase.

**Story 75: [Enabler] Testing: Framework Setup (Optional)**
* **Description:** As a Developer Team, we should set up a basic testing framework (like Jest with React Native Testing Library) *if time permits* after core functionality is built.
* **PRD Context:** N/A (Best Practice)
* **Architecture Context:** Testing.
* **Acceptance Criteria:**
    * Jest and relevant testing libraries are installed.
    * Basic configuration is set up.
    * A simple example test (e.g., for a utility function or snapshot) runs successfully.
* **Dependencies:** Core features relatively stable.
* **Assignee:** Team (Low Priority - likely skip for Hackathon)
* **Estimated Effort:** M (If attempted)

**Story 76: Testing: Manual E2E Flow**
* **Description:** As the Development Team, we need to manually test the entire critical user flow from start to finish on simulators/emulators to ensure functionality before the deadline.
* **PRD Context:** All Features (Core Flow Focus)
* **Architecture Context:** End-to-End validation.
* **Acceptance Criteria:**
    * **Flow 1 (Poster):** Signup -> AI Profile Creation -> AI Gig Creation -> Set Price (<=R1000) -> Logout.
    * **Flow 2 (Worker):** Signup -> AI Profile Creation -> Discover Gig (find gig from Flow 1) -> Swipe Right -> View Liked Gig in hypothetical list (or verify DB record) -> Find Gig Again -> View Details -> Suggest Milestones -> Logout.
    * **Flow 3:** Login as original poster, verify gig exists. Login as worker, verify session persists.
    * Test performed on both iOS simulator and Android emulator if possible.
* **Dependencies:** All core feature stories (up to Story 72).
* **Assignee:** All (Pair up or assign flows)
* **Estimated Effort:** L

**Story 77: Testing: Edge Cases (Basic)**
* **Description:** As the Development Team, we need to manually test basic error conditions and edge cases to ensure minimal robustness.
* **PRD Context:** NFR4, F3.3, F4.4
* **Architecture Context:** Error Handling.
* **Acceptance Criteria:**
    * Attempt login with invalid credentials. (Error shown?)
    * Attempt signup with an email that already exists. (Error shown?)
    * Attempt to set a gig price > R1000. (Validation prevents?)
    * Attempt to set a gig price of 0 or negative. (Validation prevents?)
    * Simulate AI function error (if possible, e.g., temporarily break endpoint secret) - does app show generic error?
    * Test navigation edge cases (e.g., back buttons during chat flows).
* **Dependencies:** Story 76 (Core flow working)
* **Assignee:** All (Distribute cases)
* **Estimated Effort:** M

**Story 78: [Enabler] Deployment: Expo EAS Setup**
* **Description:** As a Developer, I need to install the Expo Application Services (EAS) CLI, log in, and configure the `eas.json` file for a development build profile.
* **PRD Context:** N/A (Deployment Tooling)
* **Architecture Context:** Deployment Strategy (Section 8). Target file: `eas.json`.
* **Acceptance Criteria:**
    * `npm install -g eas-cli` completes successfully.
    * `eas login` completes successfully.
    * `eas build:configure` runs, or `eas.json` is created manually.
    * `eas.json` contains a `build.development` profile configured for internal distribution (or simulator builds).
* **Dependencies:** Story 18 (Expo project exists)
* **Assignee:** Sandisile
* **Estimated Effort:** S

**Story 79: Deployment: EAS Build (Development)**
* **Description:** As a Developer, I need to trigger an EAS development build for both iOS and Android to test on physical devices or simulators if needed.
* **PRD Context:** N/A (Deployment)
* **Architecture Context:** Deployment Strategy (Section 8).
* **Acceptance Criteria:**
    * `eas build --profile development --platform all` command is executed successfully.
    * Builds complete successfully on EAS servers.
    * Build artifacts (installable links/QR codes) are generated.
* **Dependencies:** Story 78 (EAS Setup), Story 81 (Code near final)
* **Assignee:** Sandisile
* **Estimated Effort:** M (Build times can vary)

**Story 80: Deployment: Install & Test Build**
* **Description:** As the Development Team, we need to install the EAS development build on physical test devices (if available) or simulators and perform final E2E checks.
* **PRD Context:** Final Validation
* **Architecture Context:** Testing on Target Platforms.
* **Acceptance Criteria:**
    * Build artifact (`.apk`/`.ipa` via link/QR code) is installed successfully on at least one Android and/or one iOS device/simulator.
    * Repeat critical path testing from Story 76 on the installed build.
    * Identify any build-specific issues not present during local development.
* **Dependencies:** Story 79 (Successful build)
* **Assignee:** All
* **Estimated Effort:** M

**Story 81: Code Cleanup & Final Review**
* **Description:** As the Development Team, we need to perform a final code review, remove temporary logs/comments, and ensure the README is updated before considering the hackathon submission complete.
* **PRD Context:** NFR6
* **Architecture Context:** Code Quality. Target files: Entire codebase, `README.md`.
* **Acceptance Criteria:**
    * Search for and remove unnecessary `console.log` statements.
    * Remove commented-out code blocks unless explicitly needed for documentation.
    * Ensure no sensitive information (API keys, secrets) is present in client-side code or committed files.
    * Update `README.md` with clear setup instructions (env vars needed, install steps) and how to run the app.
    * Perform a final `git pull` and ensure the `develop` (or `main`) branch is stable.
* **Dependencies:** All development stories nearing completion.
* **Assignee:** All (Review each other's main contributions if possible)
* **Estimated Effort:** L (Can take time)

---