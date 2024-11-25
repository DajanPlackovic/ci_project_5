from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    is_owner = serializers.SerializerMethodField()
    profile_slug = serializers.ReadOnlyField(source='author.profile.slug')
    profile_img = serializers.ReadOnlyField(source='author.profile.image.url')
    handle = serializers.ReadOnlyField(source='author.profile.handle')

    def get_is_owner(self, obj):
        request = self.context["request"]
        return obj.author == request.user

    class Meta:
        model = Comment
        fields = ['id', 'author', 'post', 'created_at',
                  'updated_at', 'text', 'html', 'profile_slug',
                  'profile_img', 'handle', 'is_owner']
