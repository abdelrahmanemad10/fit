# Fitness Blueprint

A bilingual fitness web application with personalized workout plans and AI-powered guidance. Built with React, Express, and Google's Gemini AI.

## Features

- AI-powered workout and diet plan generation
- Bilingual support (English and Arabic)
- Interactive fitness planning interface
- Responsive design for all devices
- Dark/light mode toggle
- Workout video library
- Prompt templates for specialized fitness questions

## Deployment Instructions for Vercel

### Prerequisites

- A [Vercel](https://vercel.com) account
- [Google Gemini API key](https://ai.google.dev/) (for AI-powered features)

### Steps to Deploy

1. **Create a Vercel Project**
   - Fork or download this repository
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your repository

2. **Configure Environment Variables**
   - In the project settings, add the following environment variable:
     - `GEMINI_API_KEY`: Your Google Gemini API key

3. **Use Automatic Framework Detection**
   - Let Vercel automatically detect the framework as Vite
   - Vercel will handle the build command and output directory settings

4. **Override Build Command (If Needed)**
   - If Vercel fails to auto-detect settings, set these build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your project
   - Once deployment is complete, you can access your site at the provided URL

## Local Development

### Prerequisites

- Node.js and npm installed

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Gemini AI for powering the intelligent fitness guidance
- Shadcn UI for the component library
- React and Express for the application framework