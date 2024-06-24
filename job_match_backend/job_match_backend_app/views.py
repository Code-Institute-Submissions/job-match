import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from .serializers import JobPostSerializer
from .models import JobPost,CustomUser
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def index(request):
    return HttpResponse("Använd rätt route för att hitta saker")

@api_view(['GET'])
def retrieveEmployerJobPosts(request, email):
    if request.user.is_authenticated:
        user = get_object_or_404(CustomUser, email=email)
        
        if user.is_ag:
            job_posts = JobPost.objects.filter(job_post=user)
            data = list(job_posts.values())
            if data:
                return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
            else:
                return JsonResponse([], safe=False)

        else:
            return JsonResponse({"Error": "Unauthorized"}, status=401)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=401)


@api_view(['POST'])
def createJobPost(request):
    if request.user.is_authenticated and request.user.is_ag:
        serializer = JobPostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_CREATED)
            except Exception as e:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "You are not logged in"}, status=status.HTTP_401_UNAUTHORIZED)