from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    # text = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = ['author', 'created_at',
                  'updated_at', 'text', 'html']
