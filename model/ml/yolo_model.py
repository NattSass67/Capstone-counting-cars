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

def cross_line(pos1,pos2, line_start, line_finish):
    box = min(line_start[0],line_finish[0])-20, max(line_start[0],line_finish[0])+20, min(line_start[1],line_finish[1])-20, max(line_start[1],line_finish[1])+20
    within_box = box[0]<=pos1[0]<=box[1] and box[0]<=pos2[0]<=box[1] and box[2]<=pos1[1]<=box[3] and box[2]<=pos2[1]<=box[3]
    #Within the box.
    #The line is ax1 + by1 = c, ax2+by2 = c
    # a(x1-x2) + b(y1-y2) = 0
    # a = -b(y2-y1)/(x2-x1)
    # Let a = (y2-y1), b = (x1-x2). This satisfies the equation.
    #  x1y2 - x1y1 + x1y1 - y1x2 = x1y2 - y1x2 = c = x2y2-x2y1 + x1y2 - x2y2
    
    a = line_finish[1]-line_start[1]
    b = line_start[0]-line_finish[0]
    
    c = line_start[0]*line_finish[1] - line_finish[0]*line_start[1] 
    
    first_line_geq = a*pos1[0] + b*pos1[1] >= c
    second_line_geq = a*pos2[0] + b*pos2[1] >= c
    
    return (first_line_geq != second_line_geq)


def process_video_frames_deepSort(video_path, line_position=350, line_orientation='horizontal'):
    print("process_video_deepsort_called")
    original_width = 1280  # Original video width
    original_height = 720  # Original video height
    yolo_input_size = 640  # YOLO input size (e.g., 320x320)

    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frame_skip = 3  # Process every 3rd frame

    # Initialize tracking variables
    label_counts = {}  # label -> crossing count
    previous_centroids = {}  # track_id -> previous centroid

    # Initialize DeepSort
    tracker = DeepSort(max_age=30)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip this frame

        # Perform object detection using YOLOv8
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

                bbox = [x1, y1, x2, y2]
                detection = [bbox, float(confidence), class_id]
                detections.append(detection)

        # Update tracker with detections
        tracks = tracker.update_tracks(detections, frame=frame)
        detections_to_send = []

        for track in tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue

            track_id = track.track_id
            class_id = track.det_class
            label = model.names[class_id]
            bbox = track.to_ltrb()  # [left, top, right, bottom]
            bbox = [b.item() for b in bbox]  
            centroid = ((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2)
            
            detection = {
                'track_id': track_id,
                'label': label,
                'bbox': bbox,
                'centroid': centroid
            }
            detections_to_send.append(detection)

            # Check for crossing line
            if track_id in previous_centroids:
                prev_centroid = previous_centroids[track_id]

                if line_orientation == 'horizontal':
                    line_start = (0, line_position)
                    line_finish = (frame.shape[1], line_position)
                else:
                    line_start = (line_position, 0)
                    line_finish = (line_position, frame.shape[0])

                if cross_line(prev_centroid, centroid, line_start, line_finish):
                    # Increment the label count
                    if label not in label_counts:
                        label_counts[label] = 0
                    label_counts[label] += 1

            # Update previous centroid
            previous_centroids[track_id] = centroid

        # Print updated label counts
        print(f"Current crossing counts: {label_counts}")

        # Encode frame for visualization (optional)
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        # Emit the processed frame to the client (optional, without crossing events)
        socketio.emit('frame-processed', {
            'frame': frame_base64,
            'detections': detections_to_send,
            'label_counts': label_counts,
            'line_orientation': line_orientation,
            'line_position': line_position
        })

        eventlet.sleep(0.001)

    cap.release()
    print("Video processing completed.")

    
#Using track.mean could allow one to ascertain the velocity, but let's do the velocity from just positions alone.

