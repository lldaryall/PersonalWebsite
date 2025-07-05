# Deployment Setup Guide

## Backend Deployment

### Option 1: Railway (Recommended)
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Select the `backend` folder as the source
4. Add environment variable: `OPENAI_API_KEY` with your actual API key
5. Deploy

### Option 2: Heroku
1. Create a new Heroku app
2. Connect your GitHub repository
3. Set the buildpack to Node.js
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

### Option 3: Vercel
1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Set the root directory to `backend`
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

## Frontend Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Go to [Netlify](https://netlify.com/)
2. Drag and drop your project folder (excluding backend)
3. Your site will be deployed automatically

## Environment Variables

Make sure to set these in your backend deployment platform:

- `OPENAI_API_KEY`: Your OpenAI API key from https://platform.openai.com/api-keys
- `PORT`: Usually set automatically by the platform

## Testing

1. Test the backend: `curl https://your-backend-url.railway.app/api/health`
2. Test the frontend: Visit your deployed frontend URL
3. Test the chatbot: Try sending a message in the chatbot

## Troubleshooting

- If the chatbot shows "having trouble connecting", check that your backend is running
- If you get API errors, verify your OpenAI API key is correct and has credits
- Make sure CORS is properly configured (the backend includes this) 