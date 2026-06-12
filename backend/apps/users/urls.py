from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserView, "users")
router.register(r"roles", views.RoleView, "roles")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/register/", views.register_user, name="register"),
    path("api/login/", views.login_user, name="login"),
]
