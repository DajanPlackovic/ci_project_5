from rest_framework import generics
from .models import Profile
from project_5.permissions import IsOwnerOrReadOnly
from .serializers import ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.order_by('-created_at')
    serializer_class = ProfileSerializer
