from rest_framework import serializers
from ..models import Account, Document
from .permission import CustomPermission
from rest_framework_simplejwt.tokens import RefreshToken


class AccountSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    # permission = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['email', 'token']
    
    def get_token(self, obj):
        r_token = RefreshToken.for_user(obj)
        return str(r_token.access_token)


class DocumentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Document
        exclude = ['updated_at']
    
    # def file_access(self, obj):
    #     request = self.context['request']
    #     return (
    #         CustomPermission(request, Document.__name__).check("download")
    #         or obj.uploader==request.user 
    #         or request.user.is_superuser
    #     )

    def to_internal_value(self, data):
        request = self.context['request']
        if request.method == "POST":
            data['uploader'] = request.user.id
        return super().to_internal_value(data)
    
    def get_user(self, obj):
        if obj.uploader:
            return obj.uploader.email
        return None
    
    

    # def get_file1(self, obj):
    #     # if self.file_access(obj) and obj.file:
    #     #     return obj.file.url
    #     print(self.fields)
    #     return None
    
    




    

