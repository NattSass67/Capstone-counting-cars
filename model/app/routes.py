# app/routes.py

from flask import Blueprint, request, jsonify
import os
from ml.yolo_model import YOLOModel
import ml.train_model as train
import ml.hello as hello

main = Blueprint('main', __name__)
model = YOLOModel() 

@main.route('/detect', methods=['POST'])
def detect():
    if 'video' not in request.files:
        return jsonify({"error": "No video file found"}), 400

    video = request.files['video']
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)

    # Detect objects in video
    results = model.detect_objects(video_path)

    # Clean up the saved video file after processing
    os.remove(video_path)

    return jsonify("\n".join(results))
   


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
