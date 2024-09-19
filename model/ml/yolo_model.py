# ml/yolo_model.py

import cv2
import os
from ultralytics import YOLO

class YOLOModel:
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)

    def detect_objects(self, video_path, chunk_size=100, skip_frames=60):
        
        video_capture = cv2.VideoCapture(video_path)
        frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
        results = []
        current_frame = 0

        while current_frame < frame_count:
            frames = []
            
            # Read frames in chunks
            for _ in range(chunk_size):
                ret, frame = video_capture.read()
                
                # If the frame is not valid, stop the loop
                if not ret:
                    break

                # Only process frames that are not skipped
                if current_frame % skip_frames == 0:
                    frames.append(frame)
                
                current_frame += 1
                

            if frames:
                # Perform inference on the batch of frames
                batch_results = self.model(frames)

                # Log the number of objects detected per frame in this chunk
                log_result = [f"{len(frame)} objects detected in this frame" for frame in batch_results]
                results.extend(log_result)

        # Release the video capture to free resources
        video_capture.release()

        return results
