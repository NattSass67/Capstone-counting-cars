# app/routes.py

import json
from flask import Blueprint, request, jsonify
import os
from ultralytics import YOLO
import ml.train_model as train
import ml.hello as hello
import base64
import cv2
import numpy as np
from app import socketio
from ml.yolo_model import process_video_frames_deepSort


main = Blueprint('main', __name__)

@main.route('/detect', methods=['POST'])
def upload_video():
    # Handle video upload
    print("Triggered")
    video_files = request.files.getlist("videos")
    if not video_files:
        return jsonify({'error': 'No video files provided'}), 400

    # Load lines as before
    lines_json = request.form.get("lines")
    lines = json.loads(lines_json) if lines_json else []
    lines = [(tuple(start), tuple(end)) for start, end in lines]

    # Save and process each video
    video_paths = []
    for video_file in video_files:
        video_path = os.path.join('uploads', video_file.filename)
        video_file.save(video_path)
        video_paths.append(video_path)
        # Run async background task for each video
        # socketio.start_background_task(process_video_frames_deepSort, video_path, lines)

    socketio.start_background_task(process_all_videos, video_paths, lines)

    
    return jsonify({'status': 'Video uploaded and processing started'}), 200

def process_all_videos(video_paths, lines):
    for path in video_paths:
        print(f"[START] {path}")
        process_video_frames_deepSort(path, lines)
        print(f"[DONE] {path}")

@main.route('/train', methods=['POST'])
def train():
    # You can pass dataset information in the request if needed
    data_path = request.json.get('data_path')
    epochs = request.json.get('epochs', 10)

    if not data_path:
        return jsonify({"error": "No dataset path provided"}), 400

    # Train the model with the provided data path and epochs
    train.train_yolo_model(data_path, epochs)

    return jsonify({"message": "Model training started"})

@main.route('/status', methods=['GET'])
def status():
    return jsonify({"status": "Server is running", "code": 200})


@main.route('/hello', methods=['GET'])
def helloRoute():
    return jsonify(hello.hello_test())


