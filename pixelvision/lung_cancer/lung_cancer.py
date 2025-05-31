import base64
from io import BytesIO

import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.models import load_model


def segment_lung(
    image_path, model_path="models/lung_cancer/lung_segmentation_unet.keras"
):
    # Enable unsafe deserialization to fix lambda loading error
    tf.keras.config.enable_unsafe_deserialization()

    def dice_coef(y_true, y_pred, smooth=1):
        y_true_f = tf.keras.backend.flatten(y_true)
        y_pred_f = tf.keras.backend.flatten(y_pred)
        intersection = tf.keras.backend.sum(y_true_f * y_pred_f)
        return (2.0 * intersection + smooth) / (
            tf.keras.backend.sum(y_true_f) + tf.keras.backend.sum(y_pred_f) + smooth
        )

    def iou_coef(y_true, y_pred, smooth=1):
        intersection = tf.keras.backend.sum(
            tf.keras.backend.abs(y_true * y_pred), axis=[1, 2, 3]
        )
        union = (
            tf.keras.backend.sum(y_true, [1, 2, 3])
            + tf.keras.backend.sum(y_pred, [1, 2, 3])
            - intersection
        )
        return tf.keras.backend.mean((intersection + smooth) / (union + smooth), axis=0)

    def dice_loss(y_true, y_pred):
        return 1 - dice_coef(y_true, y_pred)

    # Pass safe_mode=False to load_model
    model = load_model(
        model_path,
        custom_objects={
            "dice_coef": dice_coef,
            "iou_coef": iou_coef,
            "dice_loss": dice_loss,
        },
        safe_mode=False,
        compile=False,  # Add this to avoid optimizer warning
    )

    # Open and resize image to 256x256 as required by the model
    img = Image.open(image_path).convert("L")
    img = img.resize((256, 256), Image.Resampling.LANCZOS)
    img = np.array(img) / 255.0
    img_input = np.expand_dims(img, axis=(0, -1))

    pred_mask = model.predict(img_input)[0]
    pred_mask = (pred_mask > 0.5).astype(np.uint8) * 255

    # Resize mask back to original size if needed
    original_img = Image.open(image_path)
    original_size = original_img.size  # (width, height)

    mask_image = Image.fromarray(pred_mask.squeeze())
    mask_image = mask_image.resize(original_size, Image.Resampling.NEAREST)

    buffer = BytesIO()
    mask_image.save(buffer, format="PNG")
    buffer.seek(0)

    return base64.b64encode(buffer.getvalue()).decode("utf-8")
