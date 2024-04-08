from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Image(models.Model):
    ImageID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    FileName = models.CharField(max_length=255)
    FilePath = models.CharField(max_length=255)
    UploadDateTime = models.DateTimeField(auto_now_add=True)
    ImageFile = models.ImageField()

    def __str__(self):
        return self.FileName


class RecognitionResult(models.Model):
    ResultID = models.AutoField(primary_key=True)
    ImageID = models.ForeignKey(Image, on_delete=models.CASCADE) 
    Labels = models.TextField()
    ConfidenceScores = models.DecimalField(max_digits=5, decimal_places=2)