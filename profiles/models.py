import urllib.parse
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
import urllib


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    handle = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        upload_to='images/',
        default='../default_profile_xxrmxr'
    )
    slug = models.SlugField(max_length=240)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner} (@{self.handle})"

    def save(self, **kwargs):
        self.handle = self.owner.username.lower().replace("@", "")
        self.slug = urllib.parse.quote_plus(self.handle)
        super().save(**kwargs)


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
