from django.urls import path
from profiles import views

urlpatterns = [
    path('<int:pk>/', views.ProfileDetail.as_view()),
]
