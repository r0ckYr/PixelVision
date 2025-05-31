import base64
import io
import os

import numpy as np
import tensorflow as tf
from PIL import Image

# Define model path
MODEL_PATH = "models/brain_tumor/unet_brain_mri_seg.hdf5"

# Load model once globally
unet_model = tf.keras.models.load_model(MODEL_PATH, compile=False)


def mask_to_base64(mask_array):
    mask = (mask_array > 0.5).astype(np.uint8) * 255
    mask_img = Image.fromarray(mask.astype(np.uint8))
    buffer = io.BytesIO()
    mask_img.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def run_unet(image, output_format="base64"):
    # Load image if path is provided
    if isinstance(image, str):
        if not os.path.exists(image):
            raise FileNotFoundError(f"Image path not found: {image}")
        image = Image.open(image).convert("RGB")

    # Preprocess image
    resized_image = image.resize((256, 256))
    img_array = np.array(resized_image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = unet_model.predict(img_array)[0, :, :, 0]

    if output_format == "raw":
        return prediction
    elif output_format == "base64":
        return mask_to_base64(prediction)
    else:
        raise ValueError("output_format must be either 'raw' or 'base64'")
