// src/api/chat.ts
export async function chatWithGPT(message: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GPT response");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
