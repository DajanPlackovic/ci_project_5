from django.db.models import Count
from rest_framework import generics
from .models import Profile
from project_5.permissions import IsOwnerOrReadOnly
from .serializers import ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        comment_count=Count('owner__comment', distinct=True),
        post_count=Count('owner__post', distinct=True),
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
