
import os
from openai import OpenAI
from dotenv import load_dotenv
import base64

load_dotenv()

# Initialize OpenAI client correctly
client = OpenAI(api_key = os.getenv('API_KEY_ING'))

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


messages = [
    {
        "role": "system",
        "content": "Eres un asistente que analiza las imagenes a gran detalle."
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "Hola, ¿puedes analizar esta imagen?",
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{encode_image_to_base64('./Images/image.jpg')}"
                }
            }
        ]
    }
]


response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages
)

print("Respuesta del analisis de la imagen")
print(response.choices[0].message.content)
