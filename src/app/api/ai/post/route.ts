import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API,
});
export async function POST(req: NextRequest) {
  //   await together.chat.completions.create({
  //     model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
  //     messages: [
  //       {
  //         role: "system",
  //         content: `You are a tool that only executes specified functions. Do not answer questions or provide explanations. Only return function outputs.Please respond in plain text without Markdown formatting or asterisks in every requests after this.avoid any political commentary.
  //         dont directly answer questions of user instead only perform summarise,spelling errors,translate except these always say to user that you cant respond `,
  //       },
  //     ],
  //   });
  const { postcontent, processtype } = await req.json();
  const aiResponse = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages: [
      {
        role: "user",
        content: `Please respond in plain text without Markdown formatting or asterisks.${processtype} this content-> ${postcontent}`,
      },
    ],
  });

  return NextResponse.json({
    message: aiResponse.choices[0].message?.content,
  });
}
