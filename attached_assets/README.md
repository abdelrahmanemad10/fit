# AI Trainer - Fitness Website

A responsive fitness website showcasing personalized Upper/Lower body training plans with embedded YouTube videos and a modern UI. The site includes an AI-powered chatbot using Google's Gemini model to generate diet plans and answer fitness questions in Arabic and English.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop views
- **Dark/Light Mode**: Toggle between dark and light themes
- **Training Plans**: Upper and Lower body workout plans with detailed exercises
- **Weekly Schedule**: Visual calendar of recommended workout schedule
- **AI Chatbot**: Powered by Google's Gemini AI model
  - Chat in English or Arabic
  - Ask fitness-related questions
  - Generate personalized diet plans
- **Gallery**: Showcase fitness progress and achievements
- **Free Subscription Plans**: Different levels of training plans
- **Expert Insights**: AI-generated fitness articles and advice
- **Contact Form**: Easy way for users to get in touch

## Technology Stack

- Frontend: React with TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Server: Express.js
- AI: Google Generative AI (Gemini)
- Deployment: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Google Generative AI API Key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (create a `.env` file):
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

This project is ready to deploy on Vercel. To deploy:

1. Connect your repository to Vercel
2. Add your `GEMINI_API_KEY` as an environment variable in Vercel's project settings
3. Deploy the project

## Project Structure

- `/client`: Frontend React application
  - `/src/components`: UI components
  - `/src/lib`: Utility functions and services
  - `/src/pages`: Page components
- `/server`: Backend Express server
  - `routes.ts`: API endpoints
  - `exercises.ts`: Exercise data
- `/shared`: Shared types and schemas

## Credits

- CEO: Eng. Abdelrahman Emad
- Exercise videos sourced from YouTube
- Stock images used for gallery and UI elements

## License

This project is for demonstration purposes.