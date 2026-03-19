# check_model.py
from ultralytics import YOLO

try:
    # Load your trained model
    model = YOLO('best.pt')

    # Print the class names the model knows
    print("Model loaded successfully!")
    print("Class Names:", model.names)

except Exception as e:
    print(f"An error occurred: {e}")