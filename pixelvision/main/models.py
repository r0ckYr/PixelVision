from django.contrib.auth.models import User
from django.db import models


class Image(models.Model):
    ImageID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    FileName = models.CharField(max_length=255)
    FilePath = models.CharField(max_length=255)
    UploadDateTime = models.DateTimeField(auto_now_add=True)
    ImageFile = models.ImageField()
    FileSize = models.BigIntegerField(null=True, blank=True)  # in bytes
    ImageFormat = models.CharField(
        max_length=10, null=True, blank=True
    )  # JPEG, PNG, etc.

    def __str__(self):
        return self.FileName


class RecognitionResult(models.Model):
    ResultID = models.AutoField(primary_key=True)
    ImageID = models.ForeignKey(Image, on_delete=models.CASCADE)
    Labels = models.TextField()  # Keep original field name
    ConfidenceScores = models.DecimalField(max_digits=5, decimal_places=2)
    ProcessedDateTime = models.DateTimeField(auto_now_add=True, null=True)
    ProcessingTime = models.DecimalField(
        max_digits=8, decimal_places=4, null=True, blank=True
    )  # in seconds
    MaskImageBase64 = models.TextField(null=True, blank=True)  # Base64 encoded mask

    def __str__(self):
        return f"{self.Labels} - {self.ConfidenceScores}"
