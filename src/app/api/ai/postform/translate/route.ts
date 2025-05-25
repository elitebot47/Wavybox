import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/auth";
type TranslationRequest = {
  content: string;
  language: string;
};
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body: TranslationRequest = await req.json();
  const { content, language } = body;
  const location = "centralindia";
  try {
    const detectedLanguage = (
      await axios.post(
        "https://api.cognitive.microsofttranslator.com/detect?api-version=3.0",
        [{ Text: content }],
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.AZURE_AI_KEY,
            "Ocp-Apim-Subscription-Region": location,
            "Content-Type": "application/json",
          },
        }
      )
    ).data[0]?.language;
    if (detectedLanguage == language) {
      return NextResponse.json("same");
    }

    const response = await axios({
      baseURL: "https://api.cognitive.microsofttranslator.com",
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_AI_KEY,

        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: detectedLanguage,
        to: language,
      },
      data: [
        {
          text: content,
        },
      ],
      responseType: "json",
    });

    return NextResponse.json(response.data?.[0]?.translations?.[0].text);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
