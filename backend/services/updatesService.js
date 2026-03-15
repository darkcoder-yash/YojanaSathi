const Groq = require("groq-sdk");
const { GROQ_API_KEY } = require("../config/env");

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

// Dynamic date values
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_DATE = new Date().toISOString().split("T")[0];

// In-memory cache
let cachedUpdates = null;
let lastFetchTime = 0;

// Disable cache for testing (change to 5 * 60 * 1000 later if needed)
const CACHE_DURATION = 0;

// Fallback updates (always current year)
const fallbackUpdates = [
  {
    title: "New Scholarship Portal Launch",
    description:
      "Government launched a new portal for student scholarships to simplify the application process.",
    category: "Student",
    date: `${CURRENT_YEAR}-06-01`,
  },
  {
    title: "PM Kisan Installment Released",
    description:
      "The latest installment of PM Kisan Samman Nidhi has been credited to farmers' bank accounts.",
    category: "Farmer",
    date: `${CURRENT_YEAR}-06-10`,
  },
  {
    title: "Healthcare Digital Mission Expansion",
    description:
      "New features added to the Digital Health Card for better accessibility to medical records across hospitals.",
    category: "Healthcare",
    date: `${CURRENT_YEAR}-06-15`,
  },
];

async function generateGovernmentUpdates() {
  const currentTime = Date.now();

  // Check cache
  if (cachedUpdates && currentTime - lastFetchTime < CACHE_DURATION) {
    console.log("Returning cached government updates");
    return cachedUpdates;
  }

  try {
    console.log("Generating new government updates using Groq AI...");

    const systemPrompt = `
You are an assistant that generates realistic Indian government scheme updates.

Today's date is ${CURRENT_DATE}.
The current year is ${CURRENT_YEAR}.

Generate exactly 3 latest and realistic Indian government scheme updates relevant to the current year.

Rules:
- Do NOT generate outdated updates from years like 2023 or 2024 unless necessary.
- Prefer updates that sound recent and relevant to ${CURRENT_YEAR}.
- Avoid repeating the same scheme every time.
- Prefer variety across categories such as Farmer, Student, Employment, Healthcare, General.

Return the response strictly in JSON format as an object with a key "updates" containing an array of objects.

Each update object must include:
title
description
category
date

Descriptions must be short (1–2 sentences).

Respond ONLY with the JSON object.
`;

    const userPrompt = `Generate 3 different and recent Indian government scheme updates for ${CURRENT_YEAR}.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;

    const parsedData = JSON.parse(content);
    let updates = parsedData.updates || parsedData;

    if (Array.isArray(updates)) {
      cachedUpdates = updates;
      lastFetchTime = currentTime;
      return updates;
    }

    throw new Error("Invalid format received from AI");
  } catch (error) {
    console.error("Error generating government updates:", error);
    return fallbackUpdates;
  }
}

module.exports = {
  generateGovernmentUpdates,
};