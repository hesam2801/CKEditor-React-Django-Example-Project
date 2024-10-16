from django.contrib.auth.models import User
from django.http import JsonResponse
from . import models
import json
import base64
import regex as re  
from django.core.files.storage import FileSystemStorage  

# Create your views here.

def create_item(request):
    # if not request.user.is_authenticated or not request.user.is_superuser:   
    #     return JsonResponse({"message":"user is not authenticated"})
    
    data = json.loads(request.body.decode("utf-8"))

    name = data["name"]
    description = data["description"]

    srcs = re.findall(r'<img src="([^"]+)"', description)  
    
    num = 0
    for src in srcs:
        with open(f'./media/{name}_des{num}.png', 'wb') as f:
            image_data = base64.b64decode(src.split(",")[1])
            f.write(image_data) 

        num += 1

    des = re.sub(r'"([^"]+)"', r'"' + f"http://127.0.0.1:8000/media/{name}_des0.png" + r'"', description, flags=re.IGNORECASE)    

    models.Item.objects.create(
        name = name,
        description = des
    )
    
    return JsonResponse({"error":0, "message":"created succesfully"})


def view_items(request):
    return JsonResponse({"error":0, "message":"created succesfully", "data":[{"name":item.name, "description":item.description} for item in models.Item.objects.all()]})

def upload_image(request):  

    if request.method == 'POST' and request.FILES['upload']:  
        upload_file = request.FILES['upload']  
        fs = FileSystemStorage()  
        filename = fs.save(upload_file.name, upload_file) 
        file_url = fs.url(filename)  

        return JsonResponse({'url': file_url})  
    return JsonResponse({'error': 'Invalid request'}, status=400)