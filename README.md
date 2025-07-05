# Darya Pylypenko's Personal Website

A modern, interactive personal website featuring a chatbot assistant powered by OpenAI's GPT-3.5.

## Features

- **Interactive Chatbot**: AI-powered assistant that can answer questions about Darya
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with animations
- **Eye-tracking**: Chatbot eyes follow mouse cursor
- **Multiple Sections**: About, Education, Experience, Projects, Skills, and Contact

## Quick Start

### 1. Set up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start the backend server
npm start
```

### 2. Set up the Frontend

Simply open `index.html` in your browser, or serve it through a local server:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if live-server is installed)
npx live-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## Environment Setup

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_actual_api_key_here
PORT=3001
```

### For GitHub Pages Deployment

If you're deploying to GitHub Pages, you'll need to set up the backend separately since GitHub Pages only serves static files. You can:

1. Deploy the backend to a service like Heroku, Railway, or Vercel
2. Update the API URL in `script.js` to point to your deployed backend
3. Set the `OPENAI_API_KEY` environment variable in your backend deployment platform

The frontend will automatically use the correct API endpoint based on the environment.

## File Structure

```
PersonalWebsite/
├── index.html              # Main website file
├── styles.css              # Main styles
├── animated-elements.css   # Animation styles
├── script.js              # Frontend JavaScript
├── avatar.jpeg            # Profile image
├── README.md              # This file
└── backend/
    ├── index.js           # Express server
    ├── package.json       # Dependencies
    └── .env.example       # Environment template
```

## How the Chatbot Works

1. **Frontend**: The chatbot interface is built with HTML/CSS/JavaScript
2. **Backend**: Express.js server with OpenAI API integration
3. **AI**: GPT-3.5 model trained to respond as Darya's assistant
4. **Communication**: Frontend sends POST requests to `/api/chat` endpoint

## Development

### Running in Development Mode

```bash
# Backend with auto-reload
cd backend
npm run dev

# Frontend - use any local server
```

### Customizing the Chatbot

To modify the chatbot's personality or knowledge:

1. Edit the `systemPrompt` in `backend/index.js`
2. Add or modify information about Darya
3. Restart the backend server

## Deployment

### Backend Deployment

The backend can be deployed to platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean

### Frontend Deployment

The frontend can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Troubleshooting

### Common Issues

1. **Chatbot not responding**: Check if backend is running on port 3001
2. **API errors**: Verify OpenAI API key is correct and has credits
3. **CORS issues**: Ensure frontend and backend are on same domain or CORS is configured

### Testing the Backend

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test chat endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about Darya"}'
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-3.5 Turbo
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome

## License

This project is licensed under the MIT License.

## Contact

- **Email**: daryap101@gmail.com
- **LinkedIn**: [Darya Pylypenko](https://www.linkedin.com/in/darya-pylypenko-24288b207)
- **GitHub**: [lldaryall](https://github.com/lldaryall) 