import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('API_KEY_ING')
if not api_key:
    raise ValueError("API key is missing! Set API_KEY_ING in your environment variables.")

# Initialize OpenAI client correctly
client = OpenAI(api_key=api_key)
completion = client.chat.completions.create(
    model="gpt-4o",
    store=True,
    messages=[
        {"role": "user", "content": "TELL ME A JOKE"},
    ]
)

print(completion.choices[0].message.content)


