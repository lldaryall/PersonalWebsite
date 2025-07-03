#!/bin/bash

echo "🚀 Setting up Darya's Personal Website with Chatbot..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit backend/.env and add your OpenAI API key!"
    echo "   1. Go to https://platform.openai.com/api-keys"
    echo "   2. Create a new API key"
    echo "   3. Replace 'your_openai_api_key_here' in backend/.env"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Start the backend: cd backend && npm start"
echo "3. Open index.html in your browser"
echo ""
echo "Happy chatting! 🤖" 