// src/lib/aiResponses.js
export async function mockAIResponse(query) {
  await new Promise((r) => setTimeout(r, 700));

  const lower = query.toLowerCase();

  if (lower.includes("shirt") || lower.includes("t-shirt"))
    return "Here are some stylish shirts trending right now 👕✨";
  if (lower.includes("sneaker") || lower.includes("shoe"))
    return "I found some sneakers with great reviews 🏃‍♂️💨";
  if (lower.includes("discount") || lower.includes("offer"))
    return "Check out our Cyber Glow sale — up to 30% off select products ⚡";
  if (lower.includes("electronics"))
    return "Our latest electronics collection features AI-powered gadgets 🔋🤖";

  return "I'm still learning 🤓 — but I can help you find products by name, category, or style!";
}
