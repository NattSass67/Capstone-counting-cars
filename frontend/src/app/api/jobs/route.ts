/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";

// 👇 Disable Next.js's built-in body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility: Parse FormData using formidable
const parseForm = (req: Request): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, keepExtensions: true });
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the form data
    const { fields, files } = await parseForm(req);

    // Convert the fields (which are sent as strings) to JSON
    const lines = JSON.parse(fields.lines);
    const jobsData = JSON.parse(fields.jobsData);

    console.log("✅ lines:", lines);
    console.log("✅ jobsData:", jobsData);
    console.log("✅ uploaded videos:", files.videos);

    // 2. Save uploaded videos to public/uploads folder (create folder if it doesn't exist)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const videoPaths: string[] = [];

    // Ensure videos is an array, even if a single file was uploaded
    const videoList = Array.isArray(files.videos) ? files.videos : [files.videos];

    for (const file of videoList) {
      // Read file from temporary path
      const data = await readFile(file.filepath);
      // Convert the Buffer to a Uint8Array to satisfy writeFile type requirements
      const uint8Data = new Uint8Array(data);
      // Use originalFilename or generate a fallback name
      const fileName = file.originalFilename || `video-${Date.now()}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, uint8Data);
      videoPaths.push(`/uploads/${fileName}`);
    }

    // 3. Return a JSON response with the parsed data and saved video URLs
    return NextResponse.json({
      message: "Upload success",
      lines,
      jobsData,
      videoPaths,
    });
  } catch (err: any) {
    console.error("❌ Upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload job" },
      { status: 500 }
    );
  }
}
