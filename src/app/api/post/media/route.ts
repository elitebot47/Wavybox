import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const uploadPreset = formData.get("upload_preset");

    if (!file || typeof uploadPreset !== "string") {
      return NextResponse.json(
        { error: "Missing file or upload preset" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", blob, file.name);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dl5yxidsn/image/upload",
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      secureUrl: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "error:" + error.message,
    });
  }
}
export async function DELETE(req: NextRequest) {
  const { publicIdArray } = await req.json();

  if (publicIdArray.length === 0) {
    return NextResponse.json(
      { message: "No public IDs provided" },
      { status: 400 }
    );
  }
  try {
    await Promise.all(
      publicIdArray.map((id) =>
        cloudinary.uploader.destroy(id, {
          invalidate: true,
        })
      )
    );
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
