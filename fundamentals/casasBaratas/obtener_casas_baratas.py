import json
import requests
from bs4 import BeautifulSoup

def get_houses_under_medium_price(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    prices = []
    houses_under_medium_price = []

    scripts = soup.find_all('script', type='application/ld+json')
    for script in scripts:
        try:
            data = json.loads(script.string)
            for item in data.get('@graph', []):
                # Verificar si el item es del tipo Producto y contiene ofertas
                if item.get('@type') == 'Product' and 'offers' in item:
                    price = float(item['offers'].get('price', 0))
                    prices.append(price)
        except json.JSONDecodeError:
            continue

    medium_price = get_medium_price(prices)
    
    for script in scripts:
        try:
            data = json.loads(script.string)
            for item in data.get('@graph', []):
                if item.get('@type') == 'Product' and 'offers' in item:
                    price = float(item['offers'].get('price', 0))
                    if price < medium_price:
                        house_url = item['offers'].get('url')
                        if house_url:
                            houses_under_medium_price.append(house_url)
        except json.JSONDecodeError:
            continue
    
    return houses_under_medium_price 

def get_medium_price(prices):
    if not prices:  # Check if the list is empty
        return 0
    return sum(prices) / len(prices)

# Ejemplo de uso
url = 'https://inmuebles.mercadolibre.com.ar/departamentos/'
houses_under_medium_price = get_houses_under_medium_price(url)
print(houses_under_medium_price)








