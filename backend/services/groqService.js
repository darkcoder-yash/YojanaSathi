const Groq = require("groq-sdk");
const { GROQ_API_KEY } = require("../config/env");
const AI_BEHAVIOR = require("../utils/aiBehavior");

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

async function generateGroqResponse(userMessage, language = "en", mode = "chat") {
  try {
    let languageInstruction = "";

    if (language === "hi") {
      languageInstruction = `
IMPORTANT:
User is writing in Hindi.
Respond ONLY in Hindi (Devanagari script).
Do NOT respond in English or Hinglish.
`;
    } else if (language === "hinglish") {
      languageInstruction = `
IMPORTANT:
User is writing in Hinglish.
Respond ONLY in natural Hinglish using English script.
Do NOT use Hindi Devanagari script.
Do NOT respond in pure English.
Example tone: "Aapke liye ye schemes useful ho sakti hain."
`;
    } else {
      languageInstruction = `
IMPORTANT:
User is writing in English.
Respond ONLY in English.
Do NOT respond in Hindi or Hinglish.
`;
    }

    let formattingInstruction = "";

  if (mode === "voice") {

    formattingInstruction = `
  VOICE ASSISTANT RULES:
  - Answer in 4 or 6 short sentences only.
  - Maximum 100-110 words.
  - Do NOT use markdown.
  - Do NOT use bullet points.
  - Speak naturally like a voice assistant.
  - Keep the explanation simple.
  `;

  } else {

    formattingInstruction = `
  STRICT FORMATTING RULES:
  - Always respond in proper Markdown.
  - Use bullet points (-) for listing schemes.
  - Add a blank line between sections.
  - Never write everything in one paragraph.

  Format like this example:

  ## Scheme Name

  - **Description:** ...
  - **Benefits:** ...
  - **Eligibility:** ...
  `;

}

const systemPrompt =
  AI_BEHAVIOR + "\n\n" + languageInstruction + "\n\n" + formattingInstruction;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    });

    return (
      chatCompletion.choices[0]?.message?.content ||
      "No response generated."
    );
  } catch (error) {
    console.error("Error generating Groq response:", error);
    return "I'm sorry, I'm having trouble connecting to my service right now. Please try again later.";
  }
}

module.exports = {
  generateGroqResponse,
};