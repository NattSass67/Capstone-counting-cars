# ml/train_model.py

from ultralytics import YOLO

def train_yolo_model(data_path, epochs=10):
    # Load a YOLOv8n model
    model = YOLO('yolov8n.pt')

    # Train the model on your dataset
    model.train(data=data_path, epochs=epochs)

    print("Training completed!")
    return model

# You can now call this function to train the model when needed
