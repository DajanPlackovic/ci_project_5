from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Comment
from .serializers import CommentSerializer, CommentSerializerDetail
from project_5.permissions import IsOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating comments.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.order_by('-created_at')
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "post": ["exact"],
        "response_to": ["isnull"],
        "deleted": ["exact"]
    }

    def perform_create(self, serializer):
        """
        Saves a comment, automatically adding the logged-in user from
        the request as the author.
        """
        serializer.save(author=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, or deleting a comment.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Comment.objects.order_by('-created_at')
    serializer_class = CommentSerializerDetail
