export default {
  // Use the serverless function runtime
  runtime: 'nodejs18.x',
  
  // Define the build settings
  build: {
    // Use the default build command from your package.json
    command: 'npm run build',
    
    // Output directory for the Vite build
    outputDirectory: 'dist',
  },
  
  // Define your routes
  routes: [
    // Serve API routes from the serverless function
    { src: '/api/(.*)', dest: '/api' },
    
    // Serve all other routes from the static files
    { src: '/(.*)', dest: '/dist/$1' },
    
    // Fallback for SPA routing
    { src: '/(.*)', dest: '/dist/index.html' }
  ],
  
  // Define environment variables
  env: {
    NODE_ENV: 'production'
  }
};