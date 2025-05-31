import base64
import sys

import numpy as np
from keras.models import load_model
from PIL import Image
from tensorflow.keras.preprocessing import image

from bone_fracture.bone_fracture import bone_fracture_segment
from brain_tumor.brain_tumor import predict
from lung_cancer.lung_cancer2 import segment_lung

class_names = ["bone_fracture", "brain_tumor", "invalid", "lung_cancer"]
items = {"brain_tumor": "./models/brain_tumor_vgg16.h5"}

model = load_model("./models/vgg16_medical_image_classifier.h5")

threshold = 0.005


def resize_image(image_path):
    img = image.load_img(image_path, target_size=(200, 200))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize pixel values to [0, 1]
    return img


def convert_to_base64(image_path):
    """Convert an image file to a Base64-encoded string."""
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")


def classify_image(image_path):
    image_path = "." + image_path
    # Load and preprocess the image
    try:
        img = image.load_img(image_path, target_size=(224, 224))
    except:
        img = image.load_img("./_internal/" + image_path, target_size=(224, 224))

    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize pixel values to [0, 1]

    predictions = model.predict(img)
    predicted_index = np.argmax(predictions)
    predicted_class = class_names[predicted_index]

    mask_img = convert_to_base64(image_path)

    print(predicted_class)
    if predicted_class == "brain_tumor":
        img = Image.open(image_path).convert("RGB")
        input_image_base64, mask_img, predicted_class, result = predict(img)
    elif predicted_class == "lung_cancer":
        result = detect_lung_cancer(img)
        mask_img = segment_lung(image_path)
    elif predicted_class == "bone_fracture":
        result = detect_bone_fracture(img)
        print(result)
        if result > 0.6:
            mask_img = bone_fracture_segment(image_path)
    else:
        return "Invalid", 0.1, mask_img

    predicted_class = predicted_class.replace("_", " ")
    predicted_class = predicted_class.title()
    result = round(result, 3)
    return predicted_class, result, mask_img


def detect_brain_tumor(img):
    model = load_model("./models/brain_tumor_vgg16.h5")
    prediction = model.predict(img)
    print("bt : ", prediction)
    return prediction[0][0]


def detect_lung_cancer(img):
    model = load_model("./models/lung_cancer_vgg16.h5")
    prediction = model.predict(img)
    return prediction[0][0]


def detect_bone_fracture(img):
    model = load_model("./models/bone_fracture_vgg16.h5")
    prediction = model.predict(img)
    return prediction[0][0]


def detect_breast_cancer(img):
    model = load_model("./models/breast_cancer_vgg16.h5")
    prediction = model.predict(img)
    return prediction[0][0]
