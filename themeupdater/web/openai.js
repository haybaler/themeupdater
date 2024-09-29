// File: web/openai.js
import axios from "axios";

export async function rewriteThemeCode(themeCode) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const endpoint = "https://api.openai.com/v1/completions";

  try {
    const response = await axios.post(
      endpoint,
      {
        model: "text-davinci-003",
        prompt: `Rewrite the following code to clean and optimize it:\n\n${themeCode}`,
        max_tokens: 2048,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to audit theme code");
  }
}