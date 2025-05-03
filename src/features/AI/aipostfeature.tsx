import Together from "together-ai";
const together = new Together({
  apiKey: "b2127528627007d6903a73c055278bcbb93321a57907b54b000119354341eeac",
});
export async function AiPostFeature(postcontent: string, processtype: string) {
  const stream = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages: [
      {
        role: "user",
        content: `${processtype} this content- ${postcontent},Please respond in plain text without Markdown formatting or asterisks.`,
      },
    ],
    stream: true,
  });
  let response = "";
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  return response;
}
