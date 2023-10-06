from django.db import models
from base.models import Account, BaseModel
# Create your models here.

class Document(BaseModel):
    title = models.CharField(max_length=30)
    description = models.TextField()
    file = models.FileField(upload_to="docs/")
    uploader = models.ForeignKey(Account, on_delete=models.CASCADE)

    class Meta:
        permissions = (
            ("download_document", "Can Download File"),
        )

