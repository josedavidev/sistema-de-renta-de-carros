from rest_framework import serializers
from .models import User, Role


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "user_id",
            "user_username",
            "user_password",
            "user_firstname",
            "user_secondname",
            "user_lastname",
            "user_second_lastname",
            "user_genre",
            "user_dateofbirth",
            "user_cedula",
            "user_email",
            "user_phone",
            "user_address",
            "user_isactive",
            "user_created",
            "user_updated",
            "role",
        ]
        extra_kwargs = {
            "user_password": {
                "write_only": True,
            }
        }


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["role_id", "role_name", "role_description"]
