@echo off
echo 🚀 Setting up Darya's Personal Website with Chatbot...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first:
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

:: Navigate to backend directory
cd backend

:: Install dependencies
echo 📦 Installing backend dependencies...
call npm install

:: Create .env file if it doesn't exist
if not exist ".env" (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  IMPORTANT: Edit backend\.env and add your OpenAI API key!
    echo    1. Go to https://platform.openai.com/api-keys
    echo    2. Create a new API key
    echo    3. Replace 'your_openai_api_key_here' in backend\.env
    echo.
) else (
    echo ✅ .env file already exists
)

echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Add your OpenAI API key to backend\.env
echo 2. Start the backend: cd backend && npm start
echo 3. Open index.html in your browser
echo.
echo Happy chatting! 🤖
pause 