from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comment_count = serializers.ReadOnlyField()
    # text = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'created_at',
                  'updated_at', 'text', 'html',
                  'comment_count']
