const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json()); 


// Set up multer for handling multipart form data (file uploads)
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    // Create a form to send the video to http://localhost:5000/detect
    const form = new FormData();
    form.append("video", fs.createReadStream(req.file.path));

    console.log("Sending....")
    // Forward the video to the detection server
    const response = await axios.post("http://localhost:5000/detect", form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // Log the result from the detection server
    const logResult = response.data;

    // Clean up the uploaded file after processing
    fs.unlinkSync(req.file.path);

    // Send the result back to the frontend
    res.json({ log: logResult });
  } catch (error) {
    console.error("Error forwarding video:", error);
    res.status(500).json({ error: "Error forwarding video." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
