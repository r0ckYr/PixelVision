import cv2
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.models import load_model

run_unet_inference(
    model_path="models/brain_tumor/unet_brain_mri_seg.hdf5",
    image_path="./media/brain_tumor11.png",
    mask_path="./media/brain_tumor11-mask.png",
)
