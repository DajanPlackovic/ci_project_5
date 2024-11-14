from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view()
def test_view(request):
  return Response({"test": "This is a test"})