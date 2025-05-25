import { auth } from "@/lib/auth";
import { Mistral } from "@mistralai/mistralai";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API,
});
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" });
  }
  const { content, model }: { content: string; model: "m" | "l" } =
    await req.json();
  try {
    if (model == "m") {
      const client = new Mistral({
        apiKey: process.env.MISTRAL_API_KEY,
      });

      const res = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: ` instructions-only give final answer ,no explanation , fix spelling grammar and typing error,keep language same of input and output-${content}`,
          },
        ],
      });
      return NextResponse.json(res.choices[0].message.content);
    }
    if (model == "l") {
      const res = await together.chat.completions.create({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages: [
          {
            role: "user",
            content: `instructions-only give final answer ,no explanation , fix spelling grammar and typing error,keep language same of input and output-${content}`,
          },
        ],
      });
      return NextResponse.json(res.choices[0].message?.content);
    }
    return NextResponse.json({
      error: "Model unavailable",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
