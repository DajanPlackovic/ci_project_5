from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    is_owner = serializers.SerializerMethodField()
    comment_count = serializers.ReadOnlyField()
    profile_slug = serializers.ReadOnlyField(source='author.profile.slug')
    profile_img = serializers.ReadOnlyField(source='author.profile.image.url')
    handle = serializers.ReadOnlyField(source='author.profile.handle')
    reblogs = serializers.SerializerMethodField()
    # text = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context["request"]
        return obj.author == request.user

    def get_reblogs(self, obj):
        lst = []
        curr = obj
        while curr.reblogged:
            lst.append({
                "id": curr.reblogged.id,
                "author": curr.reblogged.author.username,
                "created_at": curr.reblogged.created_at.strftime("%d %b %Y"),
                "html": curr.reblogged.html,
                "profile_img": curr.reblogged.author.profile.image.url,
                "profile_slug": curr.reblogged.author.profile.slug,
                "handle": curr.reblogged.author.profile.handle
            })
            curr = curr.reblogged
        return lst

    class Meta:
        model = Post
        fields = ['id', 'author', 'created_at',
                  'updated_at', 'text', 'html',
                  'comment_count', 'handle',
                  'profile_img', 'profile_slug',
                  'is_owner', 'deleted', 'reblogs']
