import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
from typing import List
import json

app = FastAPI()

# --- CORS Middleware ---
# This allows your frontend (running on a different port) to communicate with this backend.
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Model Loading ---
# Load the YOLOv8 model once when the application starts.
try:
    # CORRECTED PATH: Load the model from the root of the work directory.
    model = YOLO('best.pt')
    class_names = model.names
    print("Model loaded successfully!")
    print("Class Names:", class_names)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.get("/")
def read_root():
    return {"message": "GrainVision API is running."}

@app.post("/predict/")
async def predict(files: List[UploadFile] = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Model is not loaded")

    batch_results = []
    
    image_batch = []
    original_filenames = []
    for file in files:
        original_filenames.append(file.filename)
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image_batch.append(image)

    # --- Batch Inference ---
    try:
        results = model(image_batch)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during model inference: {e}")

    # --- Process Results ---
    for i, result in enumerate(results):
        detections = []
        counts = {name: 0 for name in class_names.values()}
        
        boxes = result.boxes.xyxyn.cpu().numpy()
        scores = result.boxes.conf.cpu().numpy()
        class_ids = result.boxes.cls.cpu().numpy().astype(int)

        for box, score, class_id in zip(boxes, scores, class_ids):
            class_name = class_names[class_id]
            detections.append({
                "box": box.tolist(),
                "label": class_name,
                "score": float(score)
            })
            counts[class_name] += 1
            
        batch_results.append({
            "filename": original_filenames[i],
            "detections": detections,
            "counts": counts
        })

    return batch_results