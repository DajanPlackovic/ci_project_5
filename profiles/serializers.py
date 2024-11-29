from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    slug = serializers.ReadOnlyField()
    handle = serializers.ReadOnlyField()
    comment_count = serializers.ReadOnlyField()
    post_count = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = ['id', 'owner', 'created_at',
                  'updated_at', 'image', 'slug',
                  'handle', 'comment_count',
                  'post_count']
