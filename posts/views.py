from django.db.models import Count
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer
from project_5.permissions import IsOwnerOrReadOnly


class PostList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        comment_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    serializer_class = PostSerializer
