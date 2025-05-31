import base64
from io import BytesIO

import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import CustomObjectScope


def segment_lung(image_path, model_path="models/lung_cancer/ResUNet_model.keras"):
    # Define custom metrics for model loading
    def iou(y_true, y_pred, smooth=1):
        y_true = tf.cast(y_true, tf.float32)
        y_pred = tf.cast(y_pred > 0.5, tf.float32)
        intersection = tf.reduce_sum(y_true * y_pred, axis=[1, 2, 3])
        union = (
            tf.reduce_sum(y_true, axis=[1, 2, 3])
            + tf.reduce_sum(y_pred, axis=[1, 2, 3])
            - intersection
        )
        iou_score = (intersection + smooth) / (union + smooth)
        return tf.reduce_mean(iou_score)

    def dice_coef(y_true, y_pred):
        smooth = 1e-15
        y_true = tf.keras.layers.Flatten()(y_true)
        y_pred = tf.keras.layers.Flatten()(y_pred)
        intersection = tf.reduce_sum(y_true * y_pred)
        return (2.0 * intersection + smooth) / (
            tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + smooth
        )

    def dice_loss(y_true, y_pred):
        return 1.0 - dice_coef(y_true, y_pred)

    # Load the model
    with CustomObjectScope(
        {"iou": iou, "dice_coef": dice_coef, "dice_loss": dice_loss}
    ):
        model = load_model(model_path, compile=False)

    # Read and preprocess the image (using cv2 as in the training code)
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    original_size = image.shape[:2]  # (height, width)

    # Resize to model input size (256x256)
    input_image = cv2.resize(image, (256, 256))
    input_image = input_image / 255.0  # Normalize
    input_image = np.expand_dims(input_image, axis=0)  # Add batch dimension

    # Predict the mask
    predicted_mask = model.predict(input_image)[0]
    predicted_mask = np.squeeze(predicted_mask, axis=-1)
    predicted_mask = (predicted_mask > 0.5).astype(np.uint8) * 255

    # Resize back to original size
    predicted_mask_resized = cv2.resize(
        predicted_mask, (original_size[1], original_size[0])
    )

    # Convert to base64
    _, buffer = cv2.imencode(".png", predicted_mask_resized)
    return base64.b64encode(buffer).decode("utf-8")
