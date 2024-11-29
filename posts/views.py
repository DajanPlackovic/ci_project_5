from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post
from .serializers import PostSerializer
from project_5.permissions import IsOwnerOrReadOnly


class PostList(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating posts
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    filterset_fields = [
        'author__profile'
    ]
    search_fields = [
        'author__username',
        'html',
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, or deleting a post.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        comment_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    serializer_class = PostSerializer
