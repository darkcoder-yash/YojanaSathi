const { AI_PROVIDER } = require("../config/env");
const { generateGroqResponse } = require("./groqService");
const bedrockService = require("./bedrockService");

async function generateAIResponse(userMessage, language = "en") {
  try {
    if (AI_PROVIDER === "bedrock") {
      return await bedrockService.generateBedrockResponse(userMessage, language);
    }
    
    // Default to Groq if AI_PROVIDER is "groq", undefined, or any other value
    return await generateGroqResponse(userMessage, language);
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "An error occurred while communicating with the AI service. Please try again later.";
  }
}

module.exports = {
  generateAIResponse
};