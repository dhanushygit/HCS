from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product_table
from .serializers import ProductSerializer

class ProductListView(APIView):
    def get(self, request):
        products = Product_table.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


from django.shortcuts import render, redirect
from .forms import ProductForm

def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return render(request, 'api/create_product.html', {'msg':'user inserted sucessfully'} )# Replace with the name of the URL for your product list page
    else:
        form = ProductForm()
    return render(request, 'api/create_product.html', {'form': form})




from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if the user exists and the password matches
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Optional: Return user details or a token for further authentication
            return Response({
                "message": "Login successful",
                "username": user.username
            }, status=status.HTTP_200_OK)
        
        # If authentication fails
        return Response({
            "message": "Invalid username or password"
        }, status=status.HTTP_401_UNAUTHORIZED)



from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.conf import settings


class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "No user found with this email."}, status=status.HTTP_404_NOT_FOUND)

        # Generate reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode())

        # Send email with the reset link
        reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"
        email_subject = "Password Reset Request"
        email_message = render_to_string(
            'password_reset_email.html', {'reset_url': reset_url, 'user': user}
        )
        send_mail(email_subject, email_message, settings.DEFAULT_FROM_EMAIL, [email])

        return Response({"detail": "Password reset link sent to your email."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        token = request.data.get("token")
        password = request.data.get("password")
        uidb64 = request.data.get("uidb64")

        if not token or not password or not uidb64:
            return Response({"detail": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, User.DoesNotExist):
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        # Reset the password
        user.set_password(password)
        user.save()

        return Response({"detail": "Password has been successfully updated."}, status=status.HTTP_200_OK)
