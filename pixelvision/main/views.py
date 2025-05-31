import json
import re
import time
from decimal import Decimal

import requests
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.forms.models import model_to_dict
from django.http import JsonResponse, StreamingHttpResponse
from django.shortcuts import get_object_or_404
from django.utils.html import escape
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from image_classification import classify_image
from PIL import Image as PILImage

from .forms import ImageUploadForm, RegisterForm, UpdateProfileForm
from .models import Image, RecognitionResult

OLLAMA_URL = "http://localhost:11434/api/generate"


def get_image_metadata(image_file):
    """Extract basic metadata from uploaded image"""
    try:
        with PILImage.open(image_file) as img:
            format_name = img.format
        file_size = image_file.size if hasattr(image_file, "size") else 0
        return {"file_size": file_size, "format": format_name or "UNKNOWN"}
    except Exception:
        return {"file_size": 0, "format": "UNKNOWN"}


# Authentication Views
@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """Handle user login"""
    try:
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return JsonResponse({"error": "Username and password required"}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(
                {
                    "success": True,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                }
            )
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def logout_view(request):
    """Handle user logout"""
    logout(request)
    return JsonResponse({"success": True})


@csrf_exempt
@require_http_methods(["POST"])
def sign_up(request):
    """Handle user registration"""
    try:
        data = json.loads(request.body)
        form = RegisterForm(data)

        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse(
                {
                    "success": True,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=201,
            )
        else:
            return JsonResponse(
                {"error": "Registration failed", "errors": form.errors}, status=400
            )
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
@csrf_exempt
def profile(request):
    """Handle profile view and update"""
    if request.method == "GET":
        return JsonResponse(
            {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
            }
        )

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            form = UpdateProfileForm(data, instance=request.user)

            if form.is_valid():
                user = form.save()
                return JsonResponse(
                    {
                        "success": True,
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                        },
                    }
                )
            else:
                return JsonResponse(
                    {"error": "Profile update failed", "errors": form.errors},
                    status=400,
                )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
@login_required
def upload_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    form = ImageUploadForm(request.POST, request.FILES)
    if not form.is_valid():
        return JsonResponse(
            {"error": "Invalid image upload", "errors": form.errors}, status=400
        )

    # Extract image metadata
    image_metadata = get_image_metadata(request.FILES["ImageFile"])

    # Save image with metadata
    image = form.save(commit=False)
    image.FileName = request.FILES["ImageFile"].name
    image.FilePath = image.ImageFile.url
    image.UserID = request.user
    image.FileSize = image_metadata["file_size"]
    image.ImageFormat = image_metadata["format"]
    image.save()

    try:
        start_time = time.time()
        predicted_class, result, mask_img = classify_image(image.ImageFile.url)
        result = float(result)
        processing_time = time.time() - start_time

        # Save RecognitionResult to database
        recognition_result = RecognitionResult.objects.create(
            ImageID=image,
            Labels=predicted_class,
            ConfidenceScores=Decimal(str(result)),
            ProcessingTime=Decimal(str(round(processing_time, 4))),
            MaskImageBase64=mask_img,
        )

    except Exception as e:
        return JsonResponse(
            {"error": f"Classification failed: {str(e)}", "image_id": image.ImageID},
            status=500,
        )

    return JsonResponse(
        {
            "success": True,
            "image_id": image.ImageID,
            "predicted_class": predicted_class,
            "result": result,
            "confidence_score": result,
            "mask_img": mask_img,
            "recognition_result_id": recognition_result.ResultID,
            "processing_time": round(processing_time, 4),
            "file_size": image_metadata["file_size"],
            "image_format": image_metadata["format"],
        }
    )


@login_required
@require_http_methods(["GET"])
def images_list(request):
    """Get list of user's uploaded images and their recognition results"""
    try:
        user_images = Image.objects.filter(UserID=request.user).order_by(
            "-UploadDateTime"
        )
        combined_data = []

        for image in user_images:
            recognition_result = (
                RecognitionResult.objects.filter(ImageID=image)
                .order_by("-ResultID")
                .first()
            )

            image_data = {
                "ImageID": image.ImageID,
                "FileName": image.FileName,
                "ImageFile": {"url": image.ImageFile.url},
                "UploadDateTime": image.UploadDateTime.isoformat(),
                "FileSize": image.FileSize,
                "ImageFormat": image.ImageFormat,
            }

            recognition_data = None
            if recognition_result:
                recognition_data = {
                    "ResultID": recognition_result.ResultID,
                    "Labels": recognition_result.Labels,
                    "ConfidenceScores": (
                        float(recognition_result.ConfidenceScores)
                        if recognition_result.ConfidenceScores is not None
                        else 0.0
                    ),
                    "ProcessedDateTime": (
                        recognition_result.ProcessedDateTime.isoformat()
                        if recognition_result.ProcessedDateTime
                        else None
                    ),
                    "ProcessingTime": (
                        float(recognition_result.ProcessingTime)
                        if recognition_result.ProcessingTime is not None
                        else 0.0
                    ),
                    "HasMask": bool(recognition_result.MaskImageBase64),
                    "MaskImageBase64": (
                        recognition_result.MaskImageBase64
                        if recognition_result.MaskImageBase64
                        else None
                    ),
                }

            combined_data.append(
                {
                    "image": image_data,
                    "recognition_result": recognition_data,
                }
            )

        return JsonResponse(
            {
                "success": True,
                "combined_data": combined_data,
                "count": len(combined_data),
            }
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
@csrf_exempt
@require_http_methods(["POST"])
def delete_image(request, image_id):
    """Delete a specific image"""
    try:
        image = get_object_or_404(Image, ImageID=image_id)

        # Check if the image belongs to the current user
        if image.UserID != request.user:
            return JsonResponse({"error": "Permission denied"}, status=403)

        # Delete the image (CASCADE will delete recognition results)
        image.delete()

        return JsonResponse({"success": True, "message": "Image deleted successfully"})
    except Image.DoesNotExist:
        return JsonResponse({"error": "Image not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
@csrf_exempt
@require_http_methods(["POST"])
def process_image(request, image_id):
    """Process/classify a specific image"""
    try:
        image = get_object_or_404(Image, ImageID=image_id)

        # Check if the image belongs to the current user
        if image.UserID != request.user:
            return JsonResponse({"error": "Permission denied"}, status=403)

        # Classify the image
        try:
            start_time = time.time()
            predicted_class, result, mask_img = classify_image(image.ImageFile.url)
            result = float(result)
            processing_time = time.time() - start_time

            # Save or update RecognitionResult to database
            recognition_result, created = RecognitionResult.objects.update_or_create(
                ImageID=image,
                defaults={
                    "Labels": predicted_class,
                    "ConfidenceScores": Decimal(str(result)),
                    "ProcessingTime": Decimal(str(round(processing_time, 4))),
                    "MaskImageBase64": mask_img,
                },
            )

            return JsonResponse(
                {
                    "success": True,
                    "predicted_class": predicted_class,
                    "result": result,
                    "mask_img": mask_img,
                    "confidence_score": result,
                    "recognition_result_id": recognition_result.ResultID,
                    "created_new": created,  # True if new result, False if updated existing
                    "processing_time": round(processing_time, 4),
                }
            )
        except Exception as classification_error:
            return JsonResponse(
                {"error": f"Classification failed: {str(classification_error)}"},
                status=500,
            )
    except Image.DoesNotExist:
        return JsonResponse({"error": "Image not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# Chat functionality
@csrf_exempt
@require_http_methods(["POST"])
def chat_with_phi(request):
    """Handle AI chat requests with streaming response"""
    try:
        data = json.loads(request.body)
        question = data.get("question")

        if not question:
            return JsonResponse({"error": "Missing question"}, status=400)

        # Enhanced prompt for medical context
        prompt = f"""You are a helpful medical AI assistant. Provide clear, accurate, and supportive information about medical images and diagnoses. Always remind users to consult healthcare professionals for medical decisions.

User question: {question}

Response:"""

        payload = {
            "model": "phi",
            "prompt": prompt,
            "max_tokens": 150,  # Increased for more comprehensive responses
            "stream": True,
            "temperature": 0.7,
        }

        # Make streaming request to Ollama
        response = requests.post(OLLAMA_URL, json=payload, stream=True, timeout=30)
        if response.status_code != 200:
            return JsonResponse(
                {"error": "Failed to get response from AI model"}, status=500
            )

        # Generator to parse and buffer partial chunks into sentence-like messages
        def stream_response():
            buffer = ""
            sentence_end_re = re.compile(r"[.!?]\s*")

            try:
                for line in response.iter_lines():
                    if not line:
                        continue

                    try:
                        chunk = json.loads(line.decode("utf-8"))
                    except json.JSONDecodeError:
                        continue

                    if "response" in chunk and chunk["response"]:
                        buffer += chunk["response"]

                        # Yield chunks when we hit sentence boundaries or buffer gets long
                        while sentence_end_re.search(buffer) or len(buffer) > 80:
                            if sentence_end_re.search(buffer):
                                match = sentence_end_re.search(buffer)
                                chunk_to_send = buffer[: match.end()].strip()
                                buffer = buffer[match.end() :].strip()
                            else:
                                # Find a good breaking point (space) if buffer is too long
                                break_point = buffer.rfind(" ", 0, 80)
                                if break_point == -1:
                                    break_point = 80
                                chunk_to_send = buffer[:break_point].strip()
                                buffer = buffer[break_point:].strip()

                            if chunk_to_send:
                                yield json.dumps({"chunk": chunk_to_send}) + "\n"

                    if chunk.get("done", False):
                        # Send any remaining buffer
                        if buffer.strip():
                            yield json.dumps({"chunk": buffer.strip()}) + "\n"
                        break
            except Exception as stream_error:
                yield json.dumps(
                    {"error": f"Streaming error: {str(stream_error)}"}
                ) + "\n"

        return StreamingHttpResponse(
            stream_response(),
            content_type="application/json",
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)
    except requests.exceptions.Timeout:
        return JsonResponse({"error": "AI model request timed out"}, status=504)
    except requests.exceptions.RequestException as e:
        return JsonResponse(
            {"error": f"AI model connection failed: {str(e)}"}, status=503
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# Utility endpoints
@require_http_methods(["GET"])
def health_check(request):
    """Health check endpoint"""
    return JsonResponse(
        {
            "status": "healthy",
            "service": "Medical Image Classification API",
            "authenticated": (
                request.user.is_authenticated if hasattr(request, "user") else False
            ),
        }
    )


@login_required
@require_http_methods(["GET"])
def user_stats(request):
    """Get user statistics"""
    try:
        total_images = Image.objects.filter(UserID=request.user).count()
        processed_images = RecognitionResult.objects.filter(
            ImageID__UserID=request.user
        ).count()

        # Calculate total file size
        total_file_size = sum(
            img.FileSize or 0 for img in Image.objects.filter(UserID=request.user)
        )

        # Get average processing time
        recent_results = RecognitionResult.objects.filter(
            ImageID__UserID=request.user, ProcessingTime__isnull=False
        )
        avg_processing_time = 0
        if recent_results.exists():
            total_time = sum(float(r.ProcessingTime) for r in recent_results)
            avg_processing_time = total_time / len(recent_results)

        return JsonResponse(
            {
                "total_images": total_images,
                "processed_images": processed_images,
                "unprocessed_images": total_images - processed_images,
                "total_file_size_mb": round(total_file_size / (1024 * 1024), 2),
                "average_processing_time": round(avg_processing_time, 4),
            }
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
