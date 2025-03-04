# PixelVision
The PixelVision project is a user-friendly medical image classification web application that leverages the capabilities of Django, a high-level Python web framework, a containerization platform, to perform image recognition/classification tasks. The project aims to provide an accessible platform for users to upload images and receive real-time recognition results.

![Website look](image.png)

# Running the Project
Follow these steps to set up and run the project:

1. Clone the repository:
   ```sh
   git clone https://github.com/r0ckYr/PixelVision.git
   ```
2. Navigate into the project directory:
   ```sh
   cd PixelVision
   ```
3. Create a Python virtual environment:
   ```sh
   # Linux/macOS
   python3 -m venv env
   
   # Windows
   python -m venv env
   ```
4. Activate the virtual environment:
   ```sh
   # Linux/macOS
   source env/bin/activate
   
   # Windows
   env\Scripts\activate
   ```
5. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
6. Navigate to the `pixelvision` directory:
   ```sh
   cd pixelvision
   ```
7. Run the Django development server:
   ```sh
   # Linux/macOS
   python3 manage.py runserver
   
   # Windows
   python manage.py runserver
   ```

# Setting up the Models
The project requires pre-trained machine learning models stored in a `models.zip` file. Follow these steps to set them up:

1. Download `models.zip` from the following link:
   [Download models.zip](https://drive.google.com/file/d/1-MGkdpHdLVKkn0G9vvMes_45hjbFH_p7/view?usp=sharing)
2. Extract the contents of `models.zip`.
3. Move the extracted `models` folder into the `pixelvision/` directory.

```sh
unzip models.zip
mv models pixelvision/
```

Now your project is ready to use with the required models.

# Troubleshooting PyTorch Installation
If you encounter issues installing PyTorch, visit the official installation guide and follow the instructions for your system:

[Install PyTorch](https://pytorch.org/get-started/locally/)



