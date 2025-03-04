from ultralytics import YOLO
from PIL import Image
import cv2
import matplotlib.pyplot as plt
import io
import base64


class YOLOModel:
    def __init__(self, model_path="models/bone_fracture_segmentation.pt"):
        self.model = YOLO(model_path)
    

    def predict(self, image_path, conf_threshold=0.01):
        # Load the image
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB for visualization

        # Run inference
        results = self.model(image_path)

        max_conf = 0
        best_box = None

        # Loop through detected objects to find the highest confidence box
        for result in results:
            for box in result.boxes:
                conf = box.conf[0].item()
                if conf > max_conf:
                    max_conf = conf
                    best_box = box

        # Draw only the highest confidence bounding box
        if best_box is not None:
            x1, y1, x2, y2 = map(int, best_box.xyxy[0])
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image, f"Fracture: {max_conf:.2f}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Convert image to base64
        _, buffer = cv2.imencode('.png', cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
        image_base64 = base64.b64encode(buffer).decode('utf-8')

        return image_base64

yolo_model = YOLOModel()

def bone_fracture_segment(image_path):
    return yolo_model.predict(image_path)




