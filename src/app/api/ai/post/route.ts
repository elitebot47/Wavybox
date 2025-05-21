import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API,
});
export async function POST(req: NextRequest) {
  const {
    postcontent,
    processtype,
  }: { postcontent: string; processtype: string } = await req.json();

  async function AiResponse(content: string) {
    const res = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });
    return res.choices[0].message?.content;
  }
  if (processtype.includes("translate")) {
    const translatedText = await AiResponse(
      `Only give answer ,no explanation.${processtype} -> "${postcontent}"`
    );
    return NextResponse.json({ message: translatedText });
  }
  if (processtype.includes("spelling")) {
    const improvedText = await AiResponse(
      `Only give answer ,no explanation. ${processtype} for this -> "${postcontent}"`
    );
    return NextResponse.json({ message: improvedText });
  }
}
