export async function sendMessage(message: string, mode = "chat"): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, mode }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || data.message || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Chat Service Error:", error);
    return "Failed to connect to the AI assistant. Please try again later.";
  }
}
