# 🌾 GrainVision  
### Detection of Stones and Mud in Grains using Computer Vision

GrainVision is an AI-based system that detects **foreign contaminants like stones and mud in grains and pulses** using deep learning.

It takes an image as input and highlights impurities using **bounding boxes with labels and confidence scores**.

---

# 🚀 What This Project Does

- Detects **stones and mud particles** in grains  
- Works on **rice, pulses, and millets**  
- Highlights impurities using **bounding boxes**  
- Shows **count of detected contaminants**  
- Supports **multiple image upload (batch processing)**  

---

# 🧠 How It Works

1. Upload an image of grains  
2. The system processes the image  
3. YOLOv8 model detects impurities  
4. Output shows:
   - Bounding boxes  
   - Labels (stone / mud)  
   - Confidence score  

---

# 📷 Sample Input Images

These are real dataset images used for testing:

### 🟢 Pulses with Mud
![Pulses](./IMG_20251010_112335.jpg)

### 🍚 Rice with Stones
![Rice](./IMG_20251010_114116.jpg)

### 🌾 Mixed Grains with Contaminants
![Grains](./IMG_20251010_130604_1.jpg)

### 🟡 Millets with Stones
![Millets](./IMG_20251010_110102.jpg)

---

# 🔍 Example Output

After detection, the system:

- Draws **bounding boxes** around stones and mud  
- Displays **labels and confidence scores**  
- Provides **count of impurities detected**  

Example:

```
Detected Objects
-------------------------
Stone : 3
Mud   : 2
```

---

# 🛠 Tech Stack

- **YOLOv8 (Ultralytics)** – Object Detection  
- **FastAPI** – Backend  
- **Next.js + React** – Frontend  
- **PyTorch** – Deep Learning  
- **Docker** – Deployment  

---

# 📂 Dataset

A custom dataset was created for this project.

👉 **Download Dataset (Roboflow):**  
https://universe.roboflow.com/pulses-qndq4/stones-and-mud-detection-in-puls-bc4gs/dataset/2/images?split=train

### Dataset Details:
- Contains images of grains mixed with:
  - Stones  
  - Mud particles  
- Annotated using **YOLO format**  
- Suitable for training object detection models  
- Includes multiple grain types and lighting conditions  

---

# ⚙️ How to Run

### 1. Place Model

Put your trained model file:

```
best.pt
```

inside:

```
backend/app/
```

---

### 2. Run Project

```bash
docker compose up --build
```

---

### 3. Open Application

Frontend:
```
http://localhost:3000
```

Backend:
```
http://localhost:8000
```

---

# 📡 How to Use

1. Open the web app  
2. Upload one or more images  
3. Click **Detect**  
4. View results with bounding boxes  

---

# 📊 Output Format

```json
{
  "filename": "image.jpg",
  "detections": [
    {
      "label": "stone",
      "score": 0.92
    }
  ],
  "counts": {
    "stone": 2,
    "mud": 1
  }
}
```

---

# 🎯 Why This Project

- Manual inspection is slow and inaccurate  
- Small stones are hard to detect  
- This system provides **fast and automated detection**  

---

# 🔮 Future Improvements

- Real-time camera detection  
- Mobile application  
- More impurity classes  
- Improved accuracy with larger dataset  

---

# ✅ Summary

GrainVision is a simple and effective system for detecting **stones and mud in grains**, helping improve quality inspection using AI.# 🌾 GrainVision  
