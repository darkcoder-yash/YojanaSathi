const { response } = require("express");
const { generateGroqResponse } = require("../services/groqService");

function detectLanguage(text) {
  const hindiRegex = /[\u0900-\u097F]/;

  if (hindiRegex.test(text)) {
    return "hi";
  }

  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("hu") ||
    lowerText.includes("hai") ||
    lowerText.includes("btao") ||
    lowerText.includes("mere") ||
    lowerText.includes("kaise") ||
    lowerText.includes("mujhe") ||
    lowerText.includes("kya")
  ) {
    return "hinglish";
  }

  return "en";
}

async function handleChatRequest(req, res) {
  try {
    const { message, mode } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const language = detectLanguage(message);

    const aiResponse = await generateGroqResponse(message, language, mode);

    res.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { handleChatRequest };