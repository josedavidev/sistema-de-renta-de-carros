from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer, RoleSerializer
from .models import User, Role
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


@api_view(["POST"])
def register_user(request):
    data = request.data
    try:
        # Verificar si el user_username ya existe
        if User.objects.filter(user_username=data["user_username"]).exists():
            return Response(
                {"error": "El nombre de usuario ya está en uso"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        role = None
        if "role" in data:
            role = Role.objects.get(role_id=data["role"])
        else:
            role = Role.objects.get(role_name__iexact="cliente")

        user = User(
            user_username=data["user_username"],
            user_password=make_password(data["user_password"]),
            user_firstname=data.get("user_firstname", ""),
            user_secondname=data.get("user_secondname", ""),
            user_lastname=data.get("user_lastname", ""),
            user_second_lastname=data.get("user_second_lastname", ""),
            user_genre=data.get("user_genre", ""),
            user_dateofbirth=data.get("user_dateofbirth"),
            user_cedula=data.get("user_cedula"),
            user_email=data.get("user_email"),
            user_phone=data.get("user_phone", ""),
            user_address=data.get("user_address", ""),
            role=role,
        )
        user.save()
        return Response(
            {"message": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED
        )

    except Role.DoesNotExist:
        return Response(
            {"error": "Rol no encontrado"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def login_user(request):
    data = request.data
    try:
        # Buscar usando el campo user_username
        user = User.objects.get(user_username=data["user_username"])

        # Verificar contra user_password
        if check_password(data["user_password"], user.user_password):
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user_id": user.user_id,
                    "username": user.user_username,
                    "firstname": user.user_firstname,
                    "secondname": user.user_secondname,
                    "lastname": user.user_lastname,
                    "second_lastname": user.user_second_lastname,
                    "dateofbirth": user.user_dateofbirth,
                    "cedula": user.user_cedula,
                    "email": user.user_email,
                    "phone": user.user_phone,
                    "genre": user.user_genre,
                    "address": user.user_address,
                    "role": user.role.role_name if user.role else None,
                }
            )
        else:
            return Response({"error": "Contraseña incorrecta"}, status=401)

    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
