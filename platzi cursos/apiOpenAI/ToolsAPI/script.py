import os
from openai import OpenAI
from dotenv import load_dotenv
import requests
import json

load_dotenv()

# Initialize OpenAI client correctly
client = OpenAI(api_key = os.getenv('API_KEY_ING'))

def get_weather(latitude: float, longitude: float) -> str:
    print(f"Getting weather for {latitude}, {longitude}")
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    response = requests.get(url)
    weather_data = response.json()

    return json.dumps(weather_data)

messages = [
    {
        "role": "system",
        "content": "Eres un asistente que entrega datos sobre el clima del mundo en tiempo real"
    },
    {
        "role": "user",
        "content": "Cual es el clima en Buenos aires?"
    }
]

functions = [
    {
        "type": "function",
        "function": {
            "name":"get_weather",
            "description": "Get the weather of a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "latitude": {
                        "type": "number",
                        "description": "Latitud de la ubicacion"
                    },
                    "longitude": {
                        "type": "number",
                        "description": "longitud de la ubicacion"
                    }
                },
                "requests":["latitude", "longitude"]
            },
            "output":{
                "type": "string",
                "description": "Clima pedido por el usuario"
            }
        }
    }
]

response = client.chat.completions.create(
    model = "gpt-4o",
    messages = messages,
    tools = functions
)



assisant_message = response.choices[0].message

print("El asistente responde:")
print(assisant_message)

if assisant_message.tool_calls: 
    for tools_call in assisant_message.tool_calls:
        if tools_call.type == "function":
            function_name = tools_call.function.name
            function_args = json.loads(tools_call.function.arguments)

            if function_name == "get_weather":
                print(f"El asistente esta llamando a la funcion get_weather")
                weather_info = get_weather(
                    latitude=function_args.get("latitude"),
                    longitude=function_args.get("longitude"),
                )
                messages.append(assisant_message)
                messages.append({
                    "role": "tool",
                    "tool_call_id": tools_call.id,
                    "name": "get_weather",
                    "content": weather_info
                })
                
second_response = client.chat.completions.create(
    model = "gpt-4o",
    messages = messages
)

final_reply = second_response.choices[0].message.content

print("La respuesta final del asistente es:")
print(final_reply)
