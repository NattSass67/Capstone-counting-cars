# ml/yolo_model.py

import requests
import cv2
import os
from ultralytics import YOLO
from app import socketio
import eventlet
import base64
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort


model_name = 'yolo11s.pt'
model = YOLO(model_name).to("cuda")

def line_constants(line_starts, line_finishes):
    a = line_finishes[:,1]-line_starts[:,1]
    b = line_starts[:,0]-line_finishes[:,0]
    
    c = line_starts[:,0]*line_finishes[:,1] - line_finishes[:,0]*line_starts[:,1]
    return a,b,c
    

def cross_line(pos1,pos2, line_start, line_finish):
    box = min(line_start[0],line_finish[0])-40, max(line_start[0],line_finish[0])+40, min(line_start[1],line_finish[1])-40, max(line_start[1],line_finish[1])+40
    within_box = box[0]<=pos1[0]<=box[1] and box[0]<=pos2[0]<=box[1] and box[2]<=pos1[1]<=box[3] and box[2]<=pos2[1]<=box[3]
    if not within_box: return 0,0
    
    a = line_finish[1]-line_start[1]
    b = line_start[0]-line_finish[0]
    
    c = line_start[0]*line_finish[1] - line_finish[0]*line_start[1] 
    
    first_line_geq = a*pos1[0] + b*pos1[1] >= c
    second_line_geq = a*pos2[0] + b*pos2[1] >= c
    
    return first_line_geq , second_line_geq

def cross_line_numpy(pos1,pos2, abc):
    
    a,b,c = abc
    
    first_line_geq = a*pos1[0] + b*pos1[1] >= c
    second_line_geq = a*pos2[0] + b*pos2[1] >= c
    
    #Out crossing and in crossing.
    return np.logical_and(np.logical_not(first_line_geq), second_line_geq),  np.logical_and(first_line_geq, np.logical_not(second_line_geq))


def get_result(lines_crossed):
    result = {}
    for track_id, data in lines_crossed.items():
        label = data["label"]
        key = tuple(data["crossings"])
        if key not in result:
            result[key] = {}
        if label not in result[key]:
            result[key][label] = 0
        result[key][label] += 1
    return result

# lines = [(line_name,(x1, y1), (x2, y2)),...]
def process_video_frames_deepSort(video_path, lines, job_id):
    print("process_video_deepsort_called")
    original_width = 1280  # Original video width
    original_height = 720  # Original video height
    yolo_input_size = 640  # YOLO input size (e.g., 320x320)

    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frame_skip = 2  # Process every 3rd frame

    # Initialize tracking variables
    Result = []
    label_counts_in = {}  # label -> in count
    label_counts_out = {}  # label -> out count
    previous_centroids = {}  # track_id -> previous centroid
    lines_crossed = {}
    lines_without_names = [(start, end) for _, start, end in lines]
    # Initialize DeepSort
    tracker = DeepSort(max_age=30,bgr=False)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip this frame
        results = model(frame, classes=[2,3,5,7])

        # Prepare detections for DeepSort
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue
            for box in boxes:
                x, y, w, h = box.xywh[0]
                confidence = box.conf[0]
                class_id = int(box.cls[0])
                label = model.names[class_id]
                scale_x = 1
                scale_y = 1

                # Scale bounding box coordinates to match the original size
                w_scaled = int(w * scale_x)
                h_scaled = int(h * scale_y)
                x_scaled = int(x * scale_x)-w_scaled/2
                y_scaled = int(y * scale_y)-h_scaled/2

                bbox = [x_scaled, y_scaled, w_scaled, h_scaled]
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
                for line_id, (line_name, line_start, line_finish) in enumerate(lines):
                    prev_centroid = previous_centroids[track_id]
    
                    First,Second = cross_line(prev_centroid, centroid, line_start, line_finish)

                    if First != Second:
                        if track_id not in lines_crossed:
                            lines_crossed[track_id] = {"label": label, "crossings": []}

                        elif len(lines_crossed[track_id]["crossings"]) == 2:
                            lines_crossed[track_id]["crossings"].pop()
                        lines_crossed[track_id]["crossings"].append((line_name))
                

            # Update previous centroid
            previous_centroids[track_id] = centroid
            
        
        # Print updated label counts
        print(f"Current crossing counts: {Result}")
        
        # Encode frame for visualization (optional)
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        # Emit the processed frame to the client (optional, without crossing events)
        socketio.emit('frame-processed', {
            'frame': frame_base64,
            'detections': detections_to_send,
            'lines': lines_without_names,
            'Result': Result
        })
        eventlet.sleep(0)
    
    Result = get_result(lines_crossed)

    cap.release()
    print("Video processing completed.")
    return Result

    
#Using track.mean could allow one to ascertain the velocity, but let's do the velocity from just positions alone.
