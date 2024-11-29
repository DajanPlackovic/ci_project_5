# from https://www.codementor.io/@chidioguejiofor/implementing-a-file-upload-to-cloudinary-endpoint-with-python-drf-vj2n7j2kb
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser

import cloudinary.uploader


class UploadView(APIView):
    """
    An API view that accepts a file upload and passes it off to Cloudinary.
    """
    parser_classes = (
        MultiPartParser,
        JSONParser,
    )

    @staticmethod
    def post(request):
        file = request.data.get('image')

        if file.size > 2 * 1024 * 1024:
            return Response({
                'error': 'File too large. Maximum file size is 2MB.'
            }, status=400)

        upload_data = cloudinary.uploader.upload(file)
        return Response({
            'status': 'success',
            'data': upload_data,
        }, status=201)
