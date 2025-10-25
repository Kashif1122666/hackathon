// src/lib/geminiClient.js

// Mock Gemini responses for hackathon/demo purposes
const fakeResponses = [
  "Sure! You can try this amazing product.",
  "Absolutely! This item is highly recommended.",
  "I think you’ll love this — it’s perfect for you!",
  "Here’s a quick tip: always check reviews before buying.",
  "This product is popular among our customers!"
];

export async function askGemini(promptText) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Pick a random response
  const randomIndex = Math.floor(Math.random() * fakeResponses.length);
  return fakeResponses[randomIndex];
}
