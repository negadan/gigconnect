# Product Requirements Document: GigConnect AI (Hackathon MVP)

* **Version:** 1.1
* **Date:** 2025-05-03
* **Author:** Expert Project Manager AI
* **Project Context:** 24-Hour Hackathon
* **Team:** 4 Developers (1 Junior, 3 Senior)

## 1. Introduction & Purpose

GigConnect AI is a mobile application (iOS & Android via Expo/React Native) designed to connect users within a specific local area (initially Midrand/Gauteng, South Africa) for completing small, short-term tasks or "gigs" valued at R1000 ZAR or less. The application's core innovation lies in its extensive use of Artificial Intelligence (Microsoft Azure OpenAI) to significantly simplify and enhance the user experience, particularly through conversational interfaces for profile and gig creation, and AI-powered suggestions for pricing and task milestones. This PRD outlines the requirements for the Minimum Viable Product (MVP) to be developed during a 24-hour hackathon.

## 2. Goals & Objectives (Hackathon MVP)

* **Primary Goal:** Deliver a functional mobile app prototype demonstrating the core user flow and key AI differentiators.
* Successfully implement the core user flow: AI Profile Creation -> AI Gig Creation -> AI Price Suggestion -> Gig Discovery (Swipe) -> Gig Details View -> AI Milestone Suggestion.
* Demonstrate effective integration and secure usage of Microsoft Azure OpenAI via a Supabase Edge Function proxy.
* Showcase a functional mobile app built with Expo/TypeScript.
* Demonstrate effective use of Cursor AI (primary) and Microsoft Copilot (secondary) during the development process.
* Clearly articulate security measures (especially API key management) and considerations for the South African context (labour law, NPO potential).
* Present a compelling vision for the platform's usability, innovation, and local market potential.
* Complete within the **24-hour hackathon timeframe**.

## 3. Target Audience

* **Gig Posters:** Individuals within Midrand/Gauteng needing small, local tasks completed (max R1000 ZAR value) – e.g., errands, basic handyman help, short tutoring, event assistance.
* **Gig Workers:** Individuals within Midrand/Gauteng seeking flexible, short-term work or supplemental income locally via small tasks.
* **NPOs/NGOs (Secondary Focus for MVP):** Local organizations seeking volunteers or help with specific, small tasks within the community (addressed via informational content and value proposition articulation in MVP).

## 4. Assumptions & Constraints

* **Assumptions:**
    * The development team (1 Jr, 3 Sr) possesses the necessary skills in React Native, TypeScript, Supabase (Auth, DB, Edge Functions), and interacting with REST APIs.
    * Access to functional Azure OpenAI Service credentials (API Key) is available.
    * Access to a Supabase project/account for BaaS setup is available.
    * Cursor AI and Microsoft Copilot are available and integrated into the team's IDEs.
* **Constraints:**
    * **Time:** Strict 24-hour development window.
    * **Scope:** Limited to the defined MVP features. Non-core features (e.g., payments, reviews, messaging) are out of scope for the hackathon build.
    * **Gig Value:** All gigs MUST be capped at R1000 ZAR.
    * **Location:** Initial focus is Midrand/Gauteng (relevant for context, suggestions, potential future filtering).
    * **Security:** Azure OpenAI API key **MUST NOT** be stored in the client application. Secure Supabase Edge Function proxy is mandatory.
    * **Legal:** Must include informational content regarding South African independent contractor vs. employee distinctions and link to official resources.
    * **Pragmatism:** Given the time limit, implementation choices should favour speed and simplicity where functionality allows (e.g., error handling, state management).

## 5. Core Features (Hackathon MVP Scope)

* **F1:** User Authentication (Signup/Login via Supabase Auth)
* **F2:** Dynamic AI-Powered Profile Creation (Conversational)
* **F3:** Dynamic AI-Powered Gig Creation (Conversational, enforces R1000 limit)
* **F4:** AI Price Recommendation (Post-Gig Creation)
* **F5:** Swipeable Gig Discovery Interface
* **F6:** AI Gig Suggestions (Basic Keyword Matching)
* **F7:** Basic Gig Details View
* **F8:** AI Milestone Suggestion (On Gig Details)
* **F9:** Informational Content Screen (SA Labour Law Context & NPO Info)

## 6. Functional Requirements

| Feature ID | Feature Name                       | User Story / Requirement Description                                                                                                                                                                                                 | Priority (Hackathon) | Notes                                                                                                                                   |
| :--------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **F1** | **User Authentication** |                                                                                                                                                                                                                                      | **Critical** | Use Supabase Auth.                                                                                                                      |
| F1.1       | User Signup                      | As a new user, I want to sign up securely using my email and a password so that I can access the app.                                                                                                                                | Critical             |                                                                                                                                         |
| F1.2       | User Login                       | As a returning user, I want to log in securely using my email and password so that I can access my account.                                                                                                                            | Critical             |                                                                                                                                         |
| F1.3       | User Logout                      | As a logged-in user, I want to log out of the application.                                                                                                                                                                           | High                 |                                                                                                                                         |
| **F2** | **AI Profile Creation** |                                                                                                                                                                                                                                      | **Critical** | Aim for conversational flow. If major roadblocks occur, simplify (e.g., AI assist on fields) to ensure completion within 24h. |
| F2.1       | Initiate Profile Chat            | As a new user (after signup), I should be prompted to start a chat-based process to create my profile.                                                                                                                             | Critical             |                                                                                                                                         |
| F2.2       | Conversational Data Gathering    | As I chat with the AI, it should ask me relevant questions (based on previous answers) to gather information about my skills, interests, general availability, and preferred location area (e.g., Midrand, specific suburbs).       | Critical             |                                                                                                                                         |
| F2.3       | AI Data Extraction               | The system (via secure Supabase Edge Function) must interpret my natural language responses and extract structured data corresponding to profile fields.                                                                               | Critical             |                                                                                                                                         |
| F2.4       | Profile Storage                  | Upon completion of the chat, the extracted structured profile data must be saved securely to my user record in the Supabase database (PostgreSQL).                                                                                      | Critical             |                                                                                                                                         |
| **F3** | **AI Gig Creation** |                                                                                                                                                                                                                                      | **Critical** | Aim for conversational flow. If major roadblocks occur, simplify (e.g., AI assist on fields) to ensure completion within 24h. |
| F3.1       | Initiate Gig Creation Chat       | As a logged-in user, I want to start a chat-based process to post a new gig.                                                                                                                                                          | Critical             |                                                                                                                                         |
| F3.2       | Conversational Gig Details       | As I chat with the AI, providing my initial task idea, it should ask clarifying questions to generate a clear title, detailed description, location requirements (area/suburb), and suggested required skills for the gig.         | Critical             |                                                                                                                                         |
| F3.3       | R1000 Limit Enforcement        | During the conversation or upon completion, the AI/system must guide the user to confirm the gig value is R1000 ZAR or less. If the user indicates a higher value, the system should prevent proceeding or guide them to adjust. | Critical             |                                                                                                                                         |
| F3.4       | AI Gig Data Extraction           | The system (via secure Supabase Edge Function) must interpret my natural language responses and extract structured data for the gig (title, description, location, skills, etc.).                                                           | Critical             |                                                                                                                                         |
| F3.5       | Gig Storage                      | Upon completion of the chat, the extracted structured gig data must be saved securely to the gigs table in the Supabase database, linked to my user profile.                                                                          | Critical             |                                                                                                                                         |
| **F4** | **AI Price Recommendation** |                                                                                                                                                                                                                                      | **Critical** |                                                                                                                                         |
| F4.1       | Trigger Recommendation           | Immediately after successful AI Gig Creation (F3.5), the system should automatically trigger the price recommendation process.                                                                                                       | Critical             |                                                                                                                                         |
| F4.2       | AI Price Analysis                | The system must send the AI-generated gig description (securely via Supabase Edge Function) to Azure OpenAI with a prompt requesting a fair price *range* in ZAR, specifying the < R1000 limit and Gauteng context.                   | Critical             |                                                                                                                                         |
| F4.3       | Display Recommendation           | The system must display the suggested price range to the user who posted the gig.                                                                                                                                                    | Critical             |                                                                                                                                         |
| F4.4       | Set Final Price                  | The user must be able to confirm a price within the suggested range or manually set a final price (still enforcing <= R1000 ZAR) for the gig, which is then saved.                                                                    | Critical             |                                                                                                                                         |
| **F5** | **Swipeable Gig Discovery** |                                                                                                                                                                                                                                      | **Critical** |                                                                                                                                         |
| F5.1       | Load Gig Cards                   | As a logged-in user seeking gigs, I want to see available gigs presented one at a time in a card format that I can swipe.                                                                                                             | Critical             |                                                                                                                                         |
| F5.2       | Swipe Right (Interest/Save)      | When I swipe a gig card right, the system should register my interest (e.g., save it to a 'liked' list in Supabase for MVP - actual notification/matching is post-MVP).                                                              | Critical             |                                                                                                                                         |
| F5.3       | Swipe Left (Dismiss)             | When I swipe a gig card left, the system should dismiss the gig and not show it to me again in this view.                                                                                                                            | Critical             |                                                                                                                                         |
| F5.4       | Fetch Next Gig                   | After swiping, the next available gig card should be presented.                                                                                                                                                                      | Critical             |                                                                                                                                         |
| **F6** | **AI Gig Suggestions** |                                                                                                                                                                                                                                      | **High** |                                                                                                                                         |
| F6.1       | Suggestion Feed/Section          | As a logged-in user, I want a dedicated screen or section that shows me gigs the system thinks are relevant to my profile.                                                                                                             | High                 |                                                                                                                                         |
| F6.2       | Basic Profile-Gig Matching       | The system should perform **basic keyword matching** between profile skills/interests and gig description/skills/tags (extracted via F2/F3 and stored in Supabase) to identify relevant gigs.                                         | High                 | Keep simple for MVP.                                                                                                                    |
| F6.3       | Display Suggested Gigs           | The system should display a list or cards of these matched gigs queried from Supabase.                                                                                                                                                | High                 |                                                                                                                                         |
| **F7** | **Basic Gig Details View** |                                                                                                                                                                                                                                      | **Critical** |                                                                                                                                         |
| F7.1       | Access Details                   | As a user, I want to tap on a gig (from Swipe discovery or Suggestions) to view its full details.                                                                                                                                   | Critical             |                                                                                                                                         |
| F7.2       | Display Gig Information          | The details view must display the AI-generated gig title, full description, final set price (ZAR), general location area, required skills (if captured), and the button to trigger AI Milestone Suggestions (F8).                     | Critical             |                                                                                                                                         |
| **F8** | **AI Milestone Suggestion** |                                                                                                                                                                                                                                      | **High** |                                                                                                                                         |
| F8.1       | Trigger Milestone Suggestion     | On the Gig Details view (F7), I want to tap a button labelled "Suggest Steps" or similar.                                                                                                                                              | High                 |                                                                                                                                         |
| F8.2       | AI Milestone Generation          | The system must send the AI-generated gig description (securely via Supabase Edge Function) to Azure OpenAI with a prompt requesting a short list (e.g., 3-5) of potential steps or milestones to complete the task.                  | High                 |                                                                                                                                         |
| F8.3       | Display Milestones               | The system must display the AI-generated potential milestones clearly on the Gig Details view (or a modal). Frame as "potential" or "suggested" steps.                                                                              | High                 |                                                                                                                                         |
| **F9** | **Informational Content Screen** |                                                                                                                                                                                                                                      | **Critical** |                                                                                                                                         |
| F9.1       | Access Information               | As a user, I want to access a dedicated screen/section/modal containing important contextual information.                                                                                                                            | Critical             |                                                                                                                                         |
| F9.2       | Display SA Labour Law Context    | The screen must provide basic information explaining the general distinction between independent contractors and employees in South Africa, emphasizing the platform facilitates connections between independent parties.            | Critical             |                                                                                                                                         |
| F9.3       | Link to Official Resources       | The screen must include prominent, clickable links to official South African government resources (Dept. of Employment and Labour, SARS guidance on independent contractors).                                                          | Critical             |                                                                                                                                         |
| F9.4       | Disclaimer                       | The screen must include a clear disclaimer that the platform does not provide legal or tax advice.                                                                                                                                   | Critical             |                                                                                                                                         |
| F9.5       | Display NPO/NGO Value Prop       | The screen should briefly outline how the platform can potentially benefit local NPOs/NGOs (e.g., finding volunteers, help for small tasks).                                                                                            | High                 |                                                                                                                                         |

## 7. Non-Functional Requirements

* **NFR1: Security:**
    * **Critical:** Azure OpenAI API Key MUST be stored and accessed securely via **Supabase Edge Functions** (using environment variables/secrets). **NO API keys in client-side code.**
    * User authentication must be handled securely using **Supabase Auth**.
    * Standard security practices for mobile app development should be followed (e.g., data validation).
* **NFR2: Performance:**
    * AI conversational responses (F2, F3) should ideally return within 3-5 seconds to maintain user engagement.
    * Swipeable Gig Discovery (F5) should feel smooth and responsive.
    * API calls (especially to Azure OpenAI via Supabase Edge Functions) should be optimized.
* **NFR3: Usability:**
    * The conversational AI interfaces (F2, F3) must be intuitive and guide the user effectively.
    * The swipe interface (F5) should leverage familiar mobile patterns.
    * Navigation between core features must be clear and simple.
* **NFR4: Reliability:**
    * The core user flow must be demonstrable and function reliably for the hackathon presentation.
    * Leverage Supabase infrastructure for backend reliability.
    * Basic error handling for API calls (e.g., network issues, AI service unavailable) should be implemented, potentially displaying a simple **"Error, please try again"** message to the user.
* **NFR5: Scalability:**
    * While not a primary MVP focus, the Supabase architecture should allow for future scaling. (Low priority for Hackathon build).
* **NFR6: Maintainability:**
    * Code must be written in TypeScript for type safety.
    * Code should be reasonably well-structured and commented.
    * Leverage AI Coding Assistants (Cursor, Copilot) to promote clean code practices.
* **NFR7: Legal & Compliance:**
    * **Critical:** Implement F9 (Informational Content) accurately, including official links and disclaimers regarding SA Labour Law.
    * **Critical:** Enforce the R1000 ZAR gig value limit (F3.3, F4.4).
    * User-facing language should consistently reinforce the platform's role as a facilitator between independent parties.

## 8. AI-Specific Requirements

* **AIR1: Model:** Use Microsoft Azure OpenAI Service, specifically targeting the `gpt-3.5-turbo` model for its balance of capability, speed, and cost.
* **AIR2: Secure Access:** All calls to Azure OpenAI API MUST be proxied through secure **Supabase Edge Functions**.
* **AIR3: Prompt Engineering:**
    * Develop specific, context-aware prompts for:
        * Conversational profile creation (extracting skills, interests, availability, location).
        * Conversational gig creation (extracting title, description, location, skills, enforcing R1000 limit).
        * Price recommendation (requesting ZAR range, <R1000, Gauteng context).
        * Milestone suggestion (requesting 3-5 simple, actionable steps).
    * Prompts must be tested and iterated upon during the hackathon.
* **AIR4: Data Extraction:** AI responses from conversational forms must be parsed reliably to extract structured data (e.g., JSON) suitable for database storage in Supabase (PostgreSQL).
* **AIR5: State Management:** Implement a mechanism to manage the state of the ongoing conversations for profile/gig creation (F2, F3). **Client-side state management** is likely the simplest approach for the hackathon unless backend complexities necessitate moving it to the Edge Function.
* **AIR6: Latency Management:** Aim for responsive AI interactions (see NFR2). Consider asynchronous handling where appropriate.

## 9. Technology Stack

* **Mobile Framework:** Expo SDK (Managed Workflow if possible, Dev Client if needed)
* **Language:** TypeScript
* **UI:** React Native, Standard Components. A simple UI kit (e.g., React Native Paper) may be used *if* it demonstrably accelerates development within Expo. Swipeable Card Library (e.g., `react-native-deck-swiper`).
* **Backend:** **Supabase**
    * Authentication: Supabase Auth
    * Database: Supabase PostgreSQL
    * Serverless Functions: Supabase Edge Functions (Deno/TypeScript) - **Crucial for AI Proxy & secure key storage**
* **AI Service:** Microsoft Azure OpenAI Service (GPT-3.5-Turbo)
* **AI Coding Assistants:** Cursor AI (Primary), Microsoft Copilot (Secondary)
* **Version Control:** Git (e.g., GitHub, GitLab)

## 10. Potential Roadmap (Post-Hackathon MVP)

* **MVP (Hackathon):** Focus on Core Features F1-F9 as defined above.
* **Phase 2 (Short-term):**
    * In-app chat/messaging between users.
    * Basic User Rating/Review system.
    * Enhanced AI Gig Matching (consider embeddings/vector search via Supabase pgvector).
    * Basic Payment integration placeholders (or simple P2P advice).
    * Refined UI/UX based on initial feedback.
* **Phase 3 (Medium-term):**
    * Full Secure Payment Integration (e.g., Stripe, Paystack).
    * User Profile enhancements (verification, portfolio).
    * Advanced filtering and search for gigs (leveraging PostgreSQL).
    * Formalized NPO/NGO onboarding features.
    * Location expansion beyond Midrand/Gauteng.
* **Phase 4 (Long-term):**
    * Subscription models or commission fees.
    * Analytics dashboard.
    * Push notifications for relevant events.
    * Further AI enhancements (e.g., AI safety checks, AI dispute assistance).

## 11. Open Questions / Clarifications Needed

* All previously raised clarifying questions have been addressed in this version.

---