const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the chatbot
const systemPrompt = `You are Darya Pylypenko's personal assistant. You are helpful, friendly, and knowledgeable about Darya's background, skills, and experience. 

Key information about Darya:
- B.S./M.S. Computer Science student at Florida State University (FSU)
- Fast-tracked 5-year pathway
- Research in algorithms and systems through UROP and Directed Individual Study (DIS)
- President of Women in Computer Science (WiCS)
- AWS Cloud Practitioner certified
- 3.7 GPA
- Languages: English, Ukrainian, Italian, Russian, Spanish
- Location: Tallahassee, FL
- Skills: C++, MIPS, Python, web development, systems-level computing
- Interests: AI research, algorithmic optimization, quantitative development
- Contact: daryap101@gmail.com, +1 941-275-0410
- LinkedIn: https://www.linkedin.com/in/darya-pylypenko-24288b207
- GitHub: https://github.com/lldaryall

Always respond in a helpful and professional manner. If you don't know something specific about Darya, politely redirect to her contact information or suggest asking about her general background.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Darya\'s chatbot backend is running',
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please check your environment variables.' 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    if (error.code === 'insufficient_quota') {
      res.status(402).json({ 
        error: 'OpenAI API quota exceeded. Please check your account credits.' 
      });
    } else if (error.code === 'invalid_api_key') {
      res.status(401).json({ 
        error: 'Invalid OpenAI API key. Please check your environment variables.' 
      });
    } else {
      res.status(500).json({ 
        error: 'An error occurred while processing your request.',
        details: error.message 
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Darya's chatbot backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY not found in environment variables');
    console.warn('   Please set OPENAI_API_KEY in your .env file');
  } else {
    console.log('✅ OpenAI API key configured');
  }
}); 