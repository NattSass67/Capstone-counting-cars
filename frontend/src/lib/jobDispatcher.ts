/* eslint-disable @typescript-eslint/no-unused-vars */
import path from "path";
import axios from "axios";
import fs from "fs/promises";

const INTERVAL_MS = 10_000; // 10 seconds

async function dispatchJob() {
  const res = await axios.get("http://localhost:1337/api/jobs", {
    params: {
      filters: { taskStatus: { $eq: "pending" } },
      pagination: { page: 1, pageSize: 1 },
    },
  });

  const job = res.data.data[0];
  if (!job) return;

  const jobId = job.id;
  const { videoPath, line } = job.attributes;

  // 2. Mark as processing
  await axios.put(`http://localhost:1337/api/jobs/${jobId}`, {
    data: { taskStatus: "processing" },
  });

  // 3. Send to processing server
  try {
    const form = new FormData();
    const filePath = path.join(process.cwd(), "public", videoPath);
    const fileBuffer = await fs.readFile(filePath);
    form.append("videos", new Blob([fileBuffer]), path.basename(videoPath));
    form.append("lines", JSON.stringify([line]));

    const result = await axios.post("http://localhost:5000/detect", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 4. Mark as done
    await axios.put(`http://localhost:1337/api/jobs/${jobId}`, {
      data: { taskStatus: "done", result: result.data },
    });
  } catch (error) {
    // 5. Mark as error
    await axios.put(`http://localhost:1337/api/jobs/${jobId}`, {
      data: { taskStatus: "error" },
    });
  }
}

setInterval(dispatchJob, INTERVAL_MS);
console.log("🚀 Job dispatcher started.");
