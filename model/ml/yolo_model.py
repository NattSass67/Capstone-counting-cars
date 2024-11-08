# ml/yolo_model.py

import cv2
import os
from ultralytics import YOLO
from app import socketio
import eventlet
import base64
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort


model = YOLO('yolov8n.pt') 

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


def process_video_frames(video_path, line_position=350, line_orientation='horizontal'):
    original_width = 1280  # Original video width
    original_height = 720  # Original video height
    yolo_input_size = 640  # YOLO input size (e.g., 320x320)

    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frame_skip = 3  # Process every 3rd frame

    # Initialize tracking variables
    object_id_counter = 0
    tracked_objects = {}  # object_id -> {'label': label, 'centroid': (x, y), 'prev_centroid': (x, y), 'counted': False}
    label_counts = {}  # label -> count

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip this frame

        # Resize the frame to YOLO input size (e.g., 320x320)
        resized_frame = cv2.resize(frame, (yolo_input_size, yolo_input_size))

        # Perform object detection using YOLOv8 on the resized frame
        results = model(resized_frame)

        detections = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                confidence = box.conf[0]
                label = model.names[int(box.cls[0])]

                # Remove the filter to include all labels
                # Calculate scaling factors
                scale_x = original_width / yolo_input_size
                scale_y = original_height / yolo_input_size

                # Scale bounding box coordinates to match the original size
                x1_scaled = int(x1 * scale_x)
                y1_scaled = int(y1 * scale_y)
                x2_scaled = int(x2 * scale_x)
                y2_scaled = int(y2 * scale_y)

                # Calculate centroid
                centroid = ((x1_scaled + x2_scaled) // 2, (y1_scaled + y2_scaled) // 2)

                detections.append({
                    'label': label,
                    'confidence': float(confidence),
                    'bbox': [x1_scaled, y1_scaled, x2_scaled, y2_scaled],  # Scaled bbox
                    'centroid': centroid
                })

        # Update object tracking
        new_tracked_objects = {}
        for detection in detections:
            label = detection['label']
            centroid = detection['centroid']
            min_distance = float('inf')
            matched_object_id = None
            matched_obj_info = None

            # Match with existing objects based on centroid distance and label
            for object_id, obj_info in tracked_objects.items():
                if obj_info['label'] != label:
                    continue  # Only match objects with the same label
                prev_centroid = obj_info['centroid']
                distance = np.linalg.norm(np.array(centroid) - np.array(prev_centroid))
                if distance < 100 and distance < min_distance:  # Threshold for matching (adjust as needed)
                    min_distance = distance
                    matched_object_id = object_id
                    matched_obj_info = obj_info

            if matched_object_id is not None:
                # Update object info
                new_tracked_objects[matched_object_id] = {
                    'label': label,
                    'centroid': centroid,
                    'prev_centroid': matched_obj_info['centroid'],
                    'counted': matched_obj_info['counted']
                }
            else:
                # Assign new object ID
                new_tracked_objects[object_id_counter] = {
                    'label': label,
                    'centroid': centroid,
                    'prev_centroid': centroid,
                    'counted': False
                }
                object_id_counter += 1

        # Detect line crossing
        for object_id, obj_info in new_tracked_objects.items():
            counted = obj_info['counted']
            if not counted:
                prev_centroid = obj_info['prev_centroid']
                curr_centroid = obj_info['centroid']
                label = obj_info['label']

                if line_orientation == 'horizontal':
                    if (prev_centroid[1] < line_position <= curr_centroid[1]) or (prev_centroid[1] > line_position >= curr_centroid[1]):
                        # Update count for this label
                        label_counts[label] = label_counts.get(label, 0) + 1
                        new_tracked_objects[object_id]['counted'] = True
                else:
                    if (prev_centroid[0] < line_position <= curr_centroid[0]) or (prev_centroid[0] > line_position >= curr_centroid[0]):
                        # Update count for this label
                        label_counts[label] = label_counts.get(label, 0) + 1
                        new_tracked_objects[object_id]['counted'] = True

        # Update tracked_objects for next frame
        tracked_objects = new_tracked_objects

        # Encode the original frame to base64 for sending to the client
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        # Emit the processed frame and detections to the client
        socketio.emit('frame-processed', {
            'frame': frame_base64,
            'detections': detections,
            'label_counts': label_counts,
            'line_orientation': line_orientation,
            'line_position': line_position
        })
        print(f"Frame and scaled bounding boxes emitted. Label counts: {label_counts}")

        # Non-blocking sleep
        eventlet.sleep(0.001)

    cap.release()
    print("Video processing completed.")
    
    


def process_video_frames_deepSort(video_path, line_position=350, line_orientation='horizontal'):
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
        resized_frame = cv2.resize(frame, (yolo_input_size, yolo_input_size))

        # Perform object detection using YOLOv8 on the resized frame
        results = model(resized_frame)

        # Prepare detections for DeepSort
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                confidence = box.conf[0]
                class_id = int(box.cls[0])
                label = model.names[class_id]

                # Calculate scaling factors
                scale_x = original_width / yolo_input_size
                scale_y = original_height / yolo_input_size

                # Scale bounding box coordinates to match the original size
                x1_scaled = int(x1 * scale_x)
                y1_scaled = int(y1 * scale_y)
                x2_scaled = int(x2 * scale_x)
                y2_scaled = int(y2 * scale_y)

                # Prepare detection in the format [[x1, y1, x2, y2], confidence, class_id]
                bbox = [x1_scaled, y1_scaled, x2_scaled, y2_scaled]
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
            centroid = ((x1 + x2) // 2, (y1 + y2) // 2)

            detection = {
                'track_id': track_id,
                'label': label,
                'bbox': [int(x1), int(y1), int(x2)-int(x1), int(y2)-int(y1)],
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