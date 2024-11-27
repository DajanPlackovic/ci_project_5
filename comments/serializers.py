from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    is_owner = serializers.SerializerMethodField()
    profile_slug = serializers.ReadOnlyField(source='author.profile.slug')
    profile_img = serializers.ReadOnlyField(source='author.profile.image.url')
    handle = serializers.ReadOnlyField(source='author.profile.handle')
    responses = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context["request"]
        return obj.author == request.user

    def make_response(self, response):
        if not response:
            return None
        return {
            "id": response.id,
            'author': response.author.username,
            'post': response.post.id,
            'updated_at': response.updated_at,
            'html': response.html,
            'profile_slug': response.author.profile.slug,
            'profile_img': response.author.profile.image.url,
            'handle': response.author.profile.handle,
            'is_owner': self.get_is_owner(response),
            'deleted': response.deleted,
            'responses': [self.make_response(response) for response in response.responses.all()],
        }

    def get_responses(self, obj):
        return [self.make_response(response) for response in obj.responses.all()]

    class Meta:
        model = Comment
        fields = ['id', 'author', 'post', 'created_at',
                  'updated_at', 'text', 'html', 'profile_slug',
                  'profile_img', 'handle', 'is_owner', 'deleted',
                  'responses', 'response_to']


class CommentSerializerDetail(CommentSerializer):
    post = serializers.ReadOnlyField(source='post.id')
