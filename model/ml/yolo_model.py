# ml/yolo_model.py

import cv2
import os
from ultralytics import YOLO
from app import socketio
import eventlet
import base64
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort


model_name = 'yolo11l.pt'
model = YOLO(model_name) 

def line_constants(line_starts, line_finishes):
    a = line_finishes[:,1]-line_starts[:,1]
    b = line_starts[:,0]-line_finishes[:,0]
    
    c = line_starts[:,0]*line_finishes[:,1] - line_finishes[:,0]*line_starts[:,1]
    return a,b,c
    

def cross_line(pos1,pos2, line_start, line_finish):
    box = min(line_start[0],line_finish[0])-40, max(line_start[0],line_finish[0])+40, min(line_start[1],line_finish[1])-40, max(line_start[1],line_finish[1])+40
    within_box = box[0]<=pos1[0]<=box[1] and box[0]<=pos2[0]<=box[1] and box[2]<=pos1[1]<=box[3] and box[2]<=pos2[1]<=box[3]
    #Within the box.
    #The line is ax1 + by1 = c, ax2+by2 = c
    # a(x1-x2) + b(y1-y2) = 0
    # a = -b(y2-y1)/(x2-x1)
    # Let a = (y2-y1), b = (x1-x2). This satisfies the equation.
    #  x1y2 - x1y1 + x1y1 - y1x2 = x1y2 - y1x2 = c = x2y2-x2y1 + x1y2 - x2y2
    if not within_box: return 0,0
    
    a = line_finish[1]-line_start[1]
    b = line_start[0]-line_finish[0]
    
    c = line_start[0]*line_finish[1] - line_finish[0]*line_start[1] 
    
    first_line_geq = a*pos1[0] + b*pos1[1] >= c
    second_line_geq = a*pos2[0] + b*pos2[1] >= c
    
    return first_line_geq , second_line_geq

def cross_line_numpy(pos1,pos2, abc):
    #box = min(line_start[0],line_finish[0])-40, max(line_start[0],line_finish[0])+40, min(line_start[1],line_finish[1])-40, max(line_start[1],line_finish[1])+40
    #within_box = box[0]<=pos1[0]<=box[1] and box[0]<=pos2[0]<=box[1] and box[2]<=pos1[1]<=box[3] and box[2]<=pos2[1]<=box[3]
    #Within the box.
    #The line is ax1 + by1 = c, ax2+by2 = c
    # a(x1-x2) + b(y1-y2) = 0
    # a = -b(y2-y1)/(x2-x1)
    # Let a = (y2-y1), b = (x1-x2). This satisfies the equation.
    #  x1y2 - x1y1 + x1y1 - y1x2 = x1y2 - y1x2 = c = x2y2-x2y1 + x1y2 - x2y2
    
    a,b,c = abc
    
    first_line_geq = a*pos1[0] + b*pos1[1] >= c
    second_line_geq = a*pos2[0] + b*pos2[1] >= c
    
    #Out crossing and in crossing.
    return np.logical_and(np.logical_not(first_line_geq), second_line_geq),  np.logical_and(first_line_geq, np.logical_not(second_line_geq))


def process_video_frames_deepSort(video_path, line_position=(320,360), line_orientation='horizontal'):
    print("process_video_deepsort_called")
    original_width = 1280  # Original video width
    original_height = 720  # Original video height
    yolo_input_size = 640  # YOLO input size (e.g., 320x320)

    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frame_skip = 3  # Process every 3rd frame

    # Initialize tracking variables
    label_counts_in = {}  # label -> in count
    label_counts_out = {}  # label -> out count
    previous_centroids = {}  # track_id -> previous centroid

    # Initialize DeepSort
    tracker = DeepSort(max_age=30)
    
    #line_starts = np.linspace(200, 500,100)
    #line_stops = np.linspace(200, 500,100)
    #line_starts,line_stops = np.meshgrid(line_starts,line_stops)
    #line_starts = line_starts.reshape(-1)
    #line_stops = line_stops.reshape(-1)
    #line_grid_SHAPE = line_starts.shape[0]
    #print(line_starts.shape)
    #print(line_stops.shape)
    #if line_orientation == "horizontal":
    #    line_starts = np.stack((np.full(line_starts.shape,0),line_starts),axis=1)
    #    line_stops = np.stack((np.full(line_stops.shape,original_width),line_stops),axis=1)
    #else:
    #    line_starts = np.stack((line_starts,np.full(line_starts.shape,0)),axis=1)
    #    line_stops = np.stack((line_starts,np.full(line_stops.shape,original_height)),axis=1)
    #abcs = line_constants(line_starts, line_stops)
    #out_crossings, in_crossings = np.zeros(line_grid_SHAPE),np.zeros(line_grid_SHAPE)
    #out_crossed = {}
    #in_crossed = {}
    #in_crossing_labelled = {}
    #out_crossing_labelled = {}
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip this frame

        #resized_frame = cv2.resize(frame, (yolo_input_size, yolo_input_size))

        # Perform object detection using YOLOv8 on the resized frame
        results = model(frame)

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
                
                prev_centroid = previous_centroids[track_id]
                #new_out_crosses, new_in_crosses = cross_line_numpy(prev_centroid, centroid, abcs)
                
                #if label not in in_crossing_labelled:
                #    in_crossing_labelled[label] = np.zeros(line_grid_SHAPE)
                #if label not in out_crossing_labelled:
                #    out_crossing_labelled[label] = np.zeros(line_grid_SHAPE)
                
                #if track_id not in out_crossed:
                #    out_crossed[track_id] = np.zeros(line_grid_SHAPE)
                #if track_id not in in_crossed:
                #    in_crossed[track_id] = np.zeros(line_grid_SHAPE)
                
                #out_crossings += np.logical_and(np.logical_not(out_crossed[track_id]),new_out_crosses)
                #out_crossing_labelled[label] += np.logical_and(np.logical_not(out_crossed[track_id]),new_out_crosses)
                #out_crossed[track_id] = np.logical_or(out_crossed[track_id],new_out_crosses)
                #in_crossings += np.logical_and(np.logical_not(in_crossed[track_id]),new_in_crosses)
                #in_crossing_labelled[label] += np.logical_and(np.logical_not(in_crossed[track_id]),new_in_crosses)
                #in_crossed[track_id] = np.logical_or(in_crossed[track_id],new_in_crosses)
                #in_crossings += new_in_crosses
                
                
                if line_orientation == 'horizontal':
                    line_start = (0, line_position[0])
                    line_finish = (frame.shape[1], line_position[1])
                else:
                    line_start = (line_position[0], 0)
                    line_finish = (line_position[1], frame.shape[0])

                First,Second = cross_line(prev_centroid, centroid, line_start, line_finish)

                if First != Second:
                    if First == 1:  # "In" crossing
                        if label not in label_counts_in:
                            label_counts_in[label] = 0
                        label_counts_in[label] += 1
                    elif First == 0:  # "Out" crossing
                        if label not in label_counts_out:
                            label_counts_out[label] = 0
                        label_counts_out[label] += 1
                

            # Update previous centroid
            previous_centroids[track_id] = centroid
            
        
        
        #print("Out and in crossings")
        #out_line_loc = out_crossings.argsort()[-1000]
        #in_line_loc = in_crossings.argsort()[-1000]
        #print({i:j[out_line_loc] for i,j in out_crossing_labelled.items()})
        #print({i:j[in_line_loc] for i,j in in_crossing_labelled.items()})
        
        #print(out_crossings.max())
        #print(in_crossings.max())
        #print(out_crossings.argmax())
        #print(in_crossings.argmax())
        #print(line_starts[out_crossings.argmax()])
        #print(line_stops[out_crossings.argmax()])
        
        # Print updated label counts
        print(f"Current crossing counts: {label_counts_in}")
        
        # Encode frame for visualization (optional)
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        # Emit the processed frame to the client (optional, without crossing events)
        socketio.emit('frame-processed', {
            'frame': frame_base64,
            'detections': detections_to_send,
            'label_counts_in': label_counts_in,
            'label_counts_out': label_counts_out,
            'line_orientation': line_orientation,
            'line_position': line_position
        })

        eventlet.sleep(0.001)

    cap.release()
    print("Video processing completed.")

    
#Using track.mean could allow one to ascertain the velocity, but let's do the velocity from just positions alone.

