from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from django_quill.fields import QuillField


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = QuillField()
    html = models.TextField(blank=True)
    response_to = models.ForeignKey(
        'self', on_delete=models.DO_NOTHING,
        related_name='responses', blank=True, null=True
    )
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author}: {self.html}"

    def save(self, **kwargs):
        self.html = self.text.html
        super().save(**kwargs)

    def delete(self, **kwargs):
        self.deleted = True
        self.text = None
        self.html = "<p>DELETED</p>"
        super().save(**kwargs)
