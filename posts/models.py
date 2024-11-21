from typing import Iterable
from django.db import models
from django.contrib.auth.models import User
from django_quill.fields import QuillField


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = QuillField()
    html = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author}: {self.html}"

    def save(self, **kwargs):
        self.html = self.text.html
        super().save(**kwargs)
