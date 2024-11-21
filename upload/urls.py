from django.urls import path
from upload import views

urlpatterns = [
    path('', views.UploadView.as_view())
]
