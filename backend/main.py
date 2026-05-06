import cv2
import numpy as np
import base64
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import asyncio

app = FastAPI()

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLOv8 model (downloads automatically if not present)
model = YOLO('yolov8n.pt') 

@app.websocket("/ws/detect")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected to detection websocket.")
    try:
        while True:
            # Receive frame from client
            data = await websocket.receive_text()
            
            # The data will be a base64 encoded jpeg: "data:image/jpeg;base64,/9j/4AAQSkZ..."
            try:
                # Remove the data URL prefix if present
                if ',' in data:
                    header, base64_str = data.split(',', 1)
                else:
                    base64_str = data

                # Decode base64 to image
                img_bytes = base64.b64decode(base64_str)
                nparr = np.frombuffer(img_bytes, np.uint8)
                frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                if frame is not None:
                    # Run YOLOv8 inference (lower conf to detect more objects in background)
                    results = model(frame, verbose=False, conf=0.15, iou=0.45)
                    
                    # Extract bounding boxes
                    detections = []
                    for r in results:
                        boxes = r.boxes
                        for box in boxes:
                            x1, y1, x2, y2 = box.xyxy[0].tolist()
                            conf = float(box.conf[0])
                            cls_id = int(box.cls[0])
                            cls_name = model.names[cls_id]
                            
                            detections.append({
                                "class": cls_name,
                                "conf": conf,
                                "x1": x1,
                                "y1": y1,
                                "x2": x2,
                                "y2": y2
                            })
                    
                    # Send results back to frontend
                    await websocket.send_json({"detections": detections})
                else:
                    await websocket.send_json({"detections": [], "error": "Failed to decode frame"})
            except Exception as e:
                print(f"Error processing frame: {e}")
                await websocket.send_json({"detections": [], "error": str(e)})
                
    except WebSocketDisconnect:
        print("Client disconnected.")
    except Exception as e:
        print(f"WebSocket error: {e}")

if __name__ == "__main__":
    import uvicorn
    # Run server on port 8001
    uvicorn.run(app, host="0.0.0.0", port=8001)
