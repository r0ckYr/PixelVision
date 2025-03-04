import torch
from torchvision import transforms
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import base64
from brain_tumor.model import tumor_model

# Define the model paths
CLASSIFICATION_MODEL_PATH = 'models/brain_tumor/tumor_model_statedict_f.pth'
SEGMENTATION_MODEL_PATH = 'models/brain_tumor/unet_model.h5'

class MultiTaskModelWrapper:
    def __init__(self):
        self.segmentation_model = self.load_segmentation_model()
        self.classification_model = self.load_classification_model()
    
    def load_segmentation_model(self):
        # Load the pre-trained U-Net model
        model = tf.keras.models.load_model(SEGMENTATION_MODEL_PATH, custom_objects={'conv2d_transpose': tf.keras.layers.Conv2DTranspose})
        return model
    
    def load_classification_model(self):
        # Load the pre-trained Classification model
        tumor_model.load_state_dict(torch.load(CLASSIFICATION_MODEL_PATH, map_location=torch.device('cpu')))
        tumor_model.eval()
        return tumor_model
    
    def predict(self, image):
        # Classification prediction
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor()
        ])
        img_tensor = transform(image).unsqueeze(0)
        
        with torch.no_grad():
            classification_output = self.classification_model(img_tensor)
        
        class_probabilities = torch.nn.functional.softmax(classification_output, dim=1)
        class_label = torch.argmax(class_probabilities).item()
        probability = class_probabilities[0, class_label].item()
        
        class_names = {
            0: 'Glioma Tumor',
            1: 'Meningioma Tumor',
            2: 'No Tumor',
            3: 'Pituitary Tumor'
        }
        
        # Segmentation prediction
        img_array = np.array(image.resize((128, 128)))
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        
        segmentation_output = self.segmentation_model.predict(img_array)
        segmentation_mask = (segmentation_output > 0.5).astype(np.uint8)[0, :, :, 0] * 255
        
        # Convert segmentation mask to base64
        mask_image = Image.fromarray(segmentation_mask.astype(np.uint8))
        buffer = io.BytesIO()
        mask_image.save(buffer, format='PNG')
        mask_image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        # Convert input image to base64
        input_image_buffer = io.BytesIO()
        image.save(input_image_buffer, format='PNG')
        input_image_base64 = base64.b64encode(input_image_buffer.getvalue()).decode('utf-8')
        
        return input_image_base64, mask_image_base64, class_names[class_label], probability

# Initialize the model wrapper
model_wrapper = MultiTaskModelWrapper()

def predict(image):
    return model_wrapper.predict(image)

