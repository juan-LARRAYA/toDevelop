import requests
from logger import logger, html_logger
from settings import API_BLUE_URL, API_ML_URL,API_AMZ_URL
import json
import boto3
from botocore.config import Config

# Configuración de Amazon Product Advertising API
access_key = 'TU_ACCESS_KEY'
secret_key = 'TU_SECRET_KEY'
associate_tag = 'TU_ASSOCIATE_TAG'

# Crear un cliente de la API de Amazon
config = Config(
    region_name = 'us-east-1',  # Ajusta según tu región
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

client = boto3.client(
    'productadvertisingapi',
    aws_access_key_id = access_key,
    aws_secret_access_key = secret_key,
    config = config
)



def obtener_tipo_cambio_blue():
    response = requests.get(API_BLUE_URL)
    data = response.json()
    return data["blue"]["value_sell"]

def obtener_publicaciones_guitarras(pages):
    base_url = API_ML_URL
    
    # Listado para acumular todos los resultados
    all_results = []
    num_articulo = 0
    
    for page in range(1, pages + 1):
        modelo = ["les-paul","",""]
        url = f"{base_url}&offset={(page - 1) * 50}"  # Asumiendo 50 resultados por página
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            #logger.debug("Página %d: %s", page, json.dumps(data, indent=4))
            
            #results es el campo del json en el cual estan los ariticulos
            if "results" in data:
                # Vaciar los resultados de la página actual
                page_results = []
                for result in data["results"]:
                    titulo = result.get("title", "Sin título")
                    num_articulo +=1
                    page_results.append(f"{num_articulo}. {titulo}")

                # Loggear los resultados embellecidos de la página actual
                pretty_results_json = json.dumps(page_results, indent=4)
                html_logger.debug("Página %d - Artículos:\n%s\n", page, pretty_results_json)
                
                # Acumular los resultados de la página actual en all_results
                all_results.extend(data["results"])
            else:
                logger.error("Error en la página %d: No se encontró la clave 'results' en la respuesta de la API.", page)
                break
        else:
            logger.error("Error en la página %d: La solicitud a la API falló con status code %s.", page, response.status_code)
            break
    
    return all_results




import requests
from bs4 import BeautifulSoup
import json

def obtener_publicaciones_guitarras_amazon(pages):
    base_url = API_AMZ_URL

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    all_results = []
    item_counter = 0

    for page in range(1, pages + 1):
        url = f"{base_url}&page={page}"
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            items = soup.select(".s-main-slot .s-result-item")

            for item in items:
                title = item.select_one("h2 .a-link-normal").text.strip()
                price = item.select_one(".a-price-whole")
                if price:
                    price = float(price.text.replace(",", ""))
                else:
                    continue  # Si no hay precio, pasar al siguiente artículo
                link = "https://www.amazon.com" + item.select_one("h2 .a-link-normal")['href']
                
                all_results.append({
                    "title": title,
                    "price": price,
                    "link": link
                })
        else:
            logger.error("Error en la página %d: La solicitud a Amazon falló con status code %s.", page, response.status_code)
            break
    
    return all_results
