# app/routes.py

from flask import Blueprint, request, jsonify
import os
from ultralytics import YOLO
import ml.train_model as train
import ml.hello as hello
import base64
import cv2
import numpy as np
from app import socketio
from ml.yolo_model import process_video_frames, process_video_frames_deepSort


main = Blueprint('main', __name__)

@main.route('/detect', methods=['POST'])
def upload_video():
    # Handle video upload
    print("Triggered")
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video_file = request.files['video']
    video_path = os.path.join('uploads', video_file.filename)
    video_file.save(video_path)

    # Start processing the video frames
    socketio.start_background_task(target=process_video_frames, video_path=video_path)
    
    return jsonify({'status': 'Video uploaded and processing started'}), 200
   


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


