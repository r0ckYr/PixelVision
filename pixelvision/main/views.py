from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import RegisterForm, UpdateProfileForm, ImageUploadForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Image, RecognitionResult
from image_classification import classify_image

@login_required(login_url="/landing")
def home(request):
    return render(request, 'main/home.html')

def landing(request):
    return render(request, 'main/landing.html')


@login_required(login_url="/login")
def images(request):
    return render(request, 'main/images.html')


def about(request):
    return render(request, 'main/about.html')


def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/')
    else:
        form = RegisterForm()

    return render(request, 'registration/sign_up.html', {"form": form})


@login_required(login_url="/login")
def profile(request):
    if request.method == 'POST':
        form = UpdateProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/')
    else:
        form = UpdateProfileForm(instance=request.user)

    return render(request, 'registration/update_profile.html', {"form": form})


@login_required(login_url="/login")
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.save(commit=False)
            image.FileName = request.FILES['ImageFile'].name
            image.FilePath = image.ImageFile.url
            image.UserID = request.user
            image.save()
            predicted_class, result = classify_image(image.ImageFile.url)
            result = float(result)

            recognition_result = RecognitionResult.objects.create(
                ImageID=image,
                Labels=predicted_class,
                ConfidenceScores=result
            )

            return JsonResponse({'predicted_class': predicted_class, 'result':result})
        else:
            return JsonResponse({'error': 'Invalid image upload'})
    else:
        form = ImageUploadForm()
    return render(request, 'main/home.html', {'form': form})


@login_required(login_url="/login")
def images(request):
    user_images = Image.objects.filter(UserID=request.user)
    combined_data = []

    for image in user_images:
        recognition_result = RecognitionResult.objects.filter(ImageID=image).first()
        data = {
            'image': image,
            'recognition_result': recognition_result,
        }
        combined_data.append(data)
    return render(request, 'main/images.html', {'combined_data': combined_data})


@login_required(login_url="/login")
def delete_image(request, image_id):
    if request.method == 'POST':
        image = Image.objects.get(ImageID=image_id)
        if image and request.user == image.UserID:
            image.delete()

    return redirect('/images')


@login_required(login_url="/login")
def process_image(request, image_id):
    if request.method == 'POST':
        image = Image.objects.get(ImageID=image_id)
        if image and request.user == image.UserID:
            predicted_class, result = classify_image(image.ImageFile.url)

            recognition_result, created = RecognitionResult.objects.get_or_create(ImageID=image)

            recognition_result.Labels = predicted_class
            recognition_result.ConfidenceScore = result
            recognition_result.save()

    return redirect('/images')


# def classify_image(image_path):
#     import time
#     time.sleep(3)
#     return "cancer", 0.7