from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for Post model

    Attributes:
        author (ReadOnlyField): The author of the post
        is_owner (SerializerMethodField): Whether the current user is
            the author of the post
        comment_count (ReadOnlyField): The number of comments on the post
        profile_slug (ReadOnlyField): The slug of the author's profile
        profile_img (ReadOnlyField): The URL of the author's profile image
        handle (ReadOnlyField): The handle of the author's profile
        reblogs (SerializerMethodField): The list of reblogged posts ending
            with the post the current post is a reblog of, if the post was
            based on a previous post.
    """

    author = serializers.ReadOnlyField(source='author.username')
    author_profile = serializers.ReadOnlyField(source='author.profile.id')
    is_owner = serializers.SerializerMethodField()
    comment_count = serializers.ReadOnlyField()
    profile_slug = serializers.ReadOnlyField(source='author.profile.slug')
    profile_img = serializers.ReadOnlyField(source='author.profile.image.url')
    handle = serializers.ReadOnlyField(source='author.profile.handle')
    reblogs = serializers.SerializerMethodField()

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
                "author_profile": curr.reblogged.author.profile.id,
                "created_at": curr.reblogged.created_at.strftime("%d %b %Y"),
                "html": curr.reblogged.html,
                "profile_img": curr.reblogged.author.profile.image.url,
                "profile_slug": curr.reblogged.author.profile.slug,
                "handle": curr.reblogged.author.profile.handle
            })
            curr = curr.reblogged
        return list(reversed(lst))

    class Meta:
        model = Post
        fields = ['id', 'author', 'created_at',
                  'updated_at', 'text', 'html',
                  'comment_count', 'handle',
                  'profile_img', 'profile_slug',
                  'is_owner', 'deleted', 'reblogs',
                  'reblogged', 'author_profile']
