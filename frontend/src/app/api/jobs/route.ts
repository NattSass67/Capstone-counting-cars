/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import axios from "axios";

// 👇 Disable Next.js's built-in body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility: Parse FormData using formidable

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the form data
    const formData = await req.formData();
    console.log(formData);

    // Get the file from the form data
    const files = formData.getAll("videos");
    console.log(files);
    if (!files.length || !files[0]) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const lines = JSON.parse(formData.get("lines") as string);
    const jobsData = JSON.parse(formData.get("jobsData") as string);
    console.log(lines);
    console.log(jobsData);

    
    const uploadDir = path.join(process.cwd(), "public", "assets");
    await mkdir(uploadDir, { recursive: true });

    const savedFiles: string[] = [];

    for (const file of files) {
      if (typeof file === "object" && "arrayBuffer" in file && "name" in file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer as any);
        savedFiles.push(`/assets/${filename}`);
      }
    }

    //then post http://localhost:5000/detect by sending the video file and lines
    const forwardFormData = new FormData();
    // ✅ this works fine — File is a valid object
    forwardFormData.append("file", files[0]);

    if (lines) forwardFormData.append("lines", lines);
    // const res = await axios.post("http://localhost:5000/detect", forwardFormData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    //then look into your debugger
    

    // 3. Return a JSON response with the parsed data and saved video URLs
    return NextResponse.json({
      message: "Upload success",
      // lines,
      // jobsData,
      // videoPaths,
    });
  } catch (err: any) {
    console.error("❌ Upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload job" },
      { status: 500 }
    );
  }
}
