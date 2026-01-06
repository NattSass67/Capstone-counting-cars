# Capstone-counting-cars

A real-time vehicle counting system built with a YOLO-based object detection model. The project detects and counts vehicles by class (e.g., car, motorcycle, bus, truck) across different road conditions, displays results on a web frontend, and supports exporting counting reports for analysis and record-keeping.

---

## ✨ Features

- **YOLO-based vehicle detection** for robust performance in diverse environments
- **Counts vehicles by type/class** (configurable based on your model labels)
- **Works across road situations** (day/night, rain, traffic, different camera angles)
- **Live dashboard / frontend display** of detections and counts
- **Report export** (e.g., CSV/PDF/JSON depending on your implementation)
- Modular structure for easy upgrades (new models, new classes, new report formats)

---

## 🧠 How It Works

1. **Input**: Video stream (RTSP/IP camera), webcam, or video file  
2. **Detection**: YOLO model detects vehicles per frame  
3. **Tracking (optional but recommended)**: Assigns IDs to avoid double-counting  
4. **Counting Logic**: Increments counts by class when vehicles pass a counting line/region  
5. **Frontend**: Displays annotated video + live metrics  
6. **Reports**: Exports summary and detailed counting results

---

## 🗂️ Project Structure (Suggested)

> Adjust this to match your repository structure.

