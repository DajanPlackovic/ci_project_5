from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from django_quill.fields import QuillField


class Comment(models.Model):
    """
    A model representing a comment on a post.

    Attributes:
        author (User): The user who authored the comment.
        post (Post): The post that the comment is in response to.
        created_at (datetime): The date and time when the comment was created.
        updated_at (datetime): The date and time when the comment was last
            updated.
        text (QuillField): The main content of the comment as Quill Delta.
        html (str): The HTML representation of the comment content.
        response_to (Comment): A reference to another comment, indicating this
            comment is a response to it. Can be null if the comment is not a
            response to another comment.
        deleted (bool): A flag indicating whether the comment has been deleted.

    Methods:
        __str__(self): A string representation of the comment.
        save(self): Save a comment, automatically generating the html
            representation of the text using the QuillField's html attribute.
        delete(self): Soft delete a comment. Marks the comment as deleted, sets
            the text to None, updates the html representation with a "DELETED"
            message, and saves the changes.
    """
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
        """
        Save a comment, automatically generating the html representation
        of the text using the QuillField's html attribute.
        """
        self.html = self.text.html
        super().save(**kwargs)

    def delete(self, **kwargs):
        """
        Soft delete a comment. Marks the comment as deleted, sets the text
        to None, updates the html representation with a "DELETED" message,
        and saves the changes.
        """
        self.deleted = True
        self.text = None
        self.html = "<p>DELETED</p>"
        super().save(**kwargs)
