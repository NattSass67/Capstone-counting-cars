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
    try:
        print("Triggered")
        video_files = request.files.getlist("videos")
        if not video_files:
            print('No video files provided')
            return jsonify({'error': 'No video files provided'}), 400
        
        job_id = request.form.get("jobId")
        if not job_id:
            print('Missing jobId')
            return jsonify({'error': 'Missing jobId'}), 400

        # Load lines as before
        lines_json = request.form.get("lines")
        lines = json.loads(lines_json) if lines_json else []
        lines = [(name, tuple(start), tuple(end)) for name, start, end in lines]

        # Save and process each video
        video_paths = []
        for video_file in video_files:
            video_path = os.path.join('uploads', video_file.filename)
            video_file.save(video_path)
            video_paths.append(video_path)

        # Process the videos and get the result
        result_data = process_all_videos(video_paths, lines, job_id)
        result = {
            ', '.join(k) if isinstance(k, tuple) else str(k): v
            for k, v in result_data.items()
        }
        print("Processed result:", result)
        return jsonify(result), 200


    except Exception as e:
        print(f"Error in upload_video: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

def process_all_videos(video_paths, lines, job_id):
    for path in video_paths:
            print(f"🔄 Processing video: {path} for job: {job_id}")
            video_result = process_video_frames_deepSort(path, lines, job_id)
            return video_result



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


