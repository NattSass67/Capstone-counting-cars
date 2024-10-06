# ml/yolo_model.py

import cv2
import os
from ultralytics import YOLO
from deep_sort_realtime.deepsort_tracker import DeepSort

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
    


class YOLOModel:
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)

    def detect_objects(self, video_path, chunk_size=100, skip_frames=10):
        
        video_capture = cv2.VideoCapture(video_path)
        frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
        
        counts = {"car":set(),"motorcycle":set()}
        results = []
        current_frame = 0
        mapping = None
        tracker = DeepSort(max_age=30)

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
                #print("batch result returned.")
                for frame,result in zip(frames,batch_results):
                    if mapping == None:
                        mapping = result.names
                    formatted_detection = format_detection(result)
                    #print(formatted_detection)
                    tracks = tracker.update_tracks(formatted_detection,frame=frame)
                    for track in tracks:
                        track_class = mapping[track.det_class]
                        if track_class in counts:
                            counts[track_class].add(track.track_id)
            
                        
            
                #print("Start batch result printing")
                #print(batch_results)
                #print("Stop batch result printing")
                # Log the number of objects detected per frame in this chunk
                #log_result = [f"{len(frame)} objects detected in this frame" for frame in batch_results]
                #results.extend(log_result)

        # Release the video capture to free resources

        video_capture.release()

        return f'{len(counts["car"])} cars and {len(counts["motorcycle"])} motorcycles'
