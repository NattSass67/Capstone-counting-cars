# ml/yolo_model.py

import cv2
import os
from ultralytics import YOLO
from app import socketio
import eventlet
import base64
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort


model_name = 'yolov10x.pt'
model = YOLO(model_name) 





    

def format_detection(detection):
    #detection: Result object from frame.
    
    boxes = detection.boxes.numpy()
    bounding_boxes = boxes.xywh
    confidence = boxes.conf
    classes = boxes.cls
    #print(bounding_boxes)
    #print(confidence)
    #print(classes)
    
    #Cars and motorcycles.
    
    
    return list(zip(bounding_boxes,confidence,classes))   


def process_video_frames_deepSort(video_path, line_position=350, line_orientation='horizontal'):
    print("process_video_deepsort_called")
    original_width = 1280  # Original video width
    original_height = 720  # Original video height
    yolo_input_size = 640 # YOLO input size (e.g., 320x320)

    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frame_skip = 3  # Process every 3rd frame

    # Initialize tracking variables
    label_counts = {}  # label -> set of track_ids

    # Initialize DeepSort
    tracker = DeepSort(max_age=30)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip this frame

        # Resize the frame to YOLO input size (e.g., 320x320)
        #resized_frame = cv2.resize(frame, (yolo_input_size, yolo_input_size)) No need to resize.
        print("Shape: ",frame.shape)

        # Perform object detection using YOLOv8 on the resized frame
        results = model(frame)

        # Prepare detections for DeepSort
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue
            for box in boxes:
                x1, y1, x2, y2 = box.xywh[0]
                
                
                confidence = box.conf[0]
                class_id = int(box.cls[0])
                label = model.names[class_id]
                """
                # Calculate scaling factors
                scale_x = original_width / yolo_input_size
                scale_y = original_height / yolo_input_size

                # Scale bounding box coordinates to match the original size
                x1_scaled = int(x1 * scale_x)
                y1_scaled = int(y1 * scale_y)
                x2_scaled = int(x2 * scale_x)
                y2_scaled = int(y2 * scale_y)
                """

                # Prepare detection in the format [[x1, y1, x2, y2], confidence, class_id]
                bbox = [x1, y1, x2, y2]
                detection = [bbox, float(confidence), class_id]

                detections.append(detection)

        # Update tracker with detections
        tracks = tracker.update_tracks(detections, frame=frame)

        for track in tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue

            track_id = track.track_id
            class_id = track.det_class  # or track.class_id depending on the DeepSort version
            label = model.names[class_id]

            # Initialize the set for the label if it doesn't exist
            if label not in label_counts:
                label_counts[label] = set()

            # Add the track ID to the set for this label
            label_counts[label].add(track_id)

        # Prepare detections for sending to client (if needed)
        detections_to_send = []
        for track in tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue

            track_id = track.track_id
            class_id = track.det_class
            label = model.names[class_id]

            bbox = track.to_ltrb()  # [left, top, right, bottom]
            x1, y1, x2, y2 = bbox
            centroid = ((x1 + x2) / 2, (y1 + y2) / 2)

            detection = {
                'track_id': track_id,
                'label': label,
                'bbox': [x1,y1,x2,y2],
                'centroid': centroid
            }
            detections_to_send.append(detection)

        # Encode the original frame to base64 for sending to the client
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        # Emit the processed frame and detections to the client
        socketio.emit('frame-processed', {
            'frame': frame_base64,
            'detections': detections_to_send,
            'label_counts': {label: len(ids) for label, ids in label_counts.items()}
        })
        print(f"Frame processed. Current counts: { {label: len(ids) for label, ids in label_counts.items()} }")

        # Non-blocking sleep
        eventlet.sleep(0.001)

    cap.release()
    print("Video processing completed.")