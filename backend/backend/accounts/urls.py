from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView

urlpatterns = [
    path("users", RegisterView.as_view(), name="register"),          # 註冊
    path("sessions", TokenObtainPairView.as_view(), name="login"),   # 登入 (JWT)
    path("sessions/refresh", TokenRefreshView.as_view(), name="refresh"),
    path("users/me", MeView.as_view(), name="me"),                   # 個人資訊
]