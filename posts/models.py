from typing import Iterable
from django.db import models
from django.contrib.auth.models import User
from django_quill.fields import QuillField


class Post(models.Model):
    """
    A model representing a blog post.

    Attributes:
        author (User): The user who authored the post. Can be null if the
            author is deleted.
        created_at (datetime): The date and time when the post was created.
        updated_at (datetime): The date and time when the post was last
            updated.
        text (QuillField): The main content of the post as Quill Delta.
        html (str): The HTML representation of the post content.
        deleted (bool): A flag indicating whether the post has been
            soft-deleted.
        reblogged (Post): A reference to another post, indicating this post
            is a reblog of it.

    Methods:
        __str__(): Returns a string representation of the post, showing
            the author and HTML content.
        save(): Saves the post, automatically generating the HTML
            from the text content.
        delete(): Soft deletes the post, updating the HTML with a "DELETED"
            message and clearing the text.
    """

    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = QuillField()
    html = models.TextField(blank=True)
    deleted = models.BooleanField(default=False)
    reblogged = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.DO_NOTHING
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author}: {self.html}"

    def save(self, **kwargs):
        """
        Save a post, automatically generating the html representation
        of the text using the QuillField's html attribute.
        """
        self.html = self.text.html
        super().save(**kwargs)

    def delete(self, **kwargs):
        """
        Soft delete a post. Updates the html representation with a "DELETED" message,
        sets the text to an empty string, and sets the deleted field to True.
        """
        self.html = "<p>DELETED<p>"
        self.text = ""
        self.deleted = True
        super().save(**kwargs)
