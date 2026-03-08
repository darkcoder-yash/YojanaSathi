const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const NODE_ENV = process.env.NODE_ENV || 'development';
const AI_PROVIDER = process.env.AI_PROVIDER || 'groq';

if (!GROQ_API_KEY) {
  console.warn('Warning: GROQ_API_KEY is missing from environment variables.');
}

module.exports = {
  PORT,
  GROQ_API_KEY,
  GEMINI_API_KEY,
  NODE_ENV,
  AI_PROVIDER
};