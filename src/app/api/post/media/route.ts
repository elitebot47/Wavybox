import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
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
    const buffer = Buffer.from(arrayBuffer);

    // Prepare the form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", new Blob([buffer]), file.name);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dl5yxidsn/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return NextResponse.json({
      secureUrl: response.data.secure_url,
      public_id: response.data.public_id,
    });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json({
        message: "error:" + error.response.data,
      });
    } else if (error.request) {
      return NextResponse.json({
        message: "error:" + error.request,
      });
    } else {
      return NextResponse.json({
        message: "error:" + error.message,
      });
    }
  }
}
export async function DELETE(req: NextRequest) {
  const { publicIdArray } = await req.json();
  console.log(publicIdArray);

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
