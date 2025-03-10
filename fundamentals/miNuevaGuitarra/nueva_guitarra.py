"""
Hacer un codigo que tome los datos en mercado libre y market place.
Calcule el precio en dolares de un instrumento en funcion de su categoria y el tipo de cambio blue del dia y si hay un articulo mucho mas barato que devuelva el link, este filtrado que lo realize por marca y modelo de guitarra.

una vez que tengas la marca y el modelo compare que este por debajo de su valor promedio en dolares (la mitad de lo que cuesta usada en ebay o reveb) y si hay un buengap que te devultva los links o que te abra los links todos en una pagina de google.
"""
import requests
from bs4 import BeautifulSoup
import webbrowser
import logging


logging.basicConfig(filename='example.log', encoding='utf-8',level = logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# Crear un logger específico para tu aplicación
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
# Configuración de un handler para el logger de tu aplicación
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Evitar que los mensajes DEBUG de bibliotecas externas se muestren
logging.getLogger("requests").setLevel(logging.WARNING)


# Función para obtener el tipo de cambio del dólar blue
def obtener_tipo_cambio_blue():
    url = "https://api.bluelytics.com.ar/v2/latest"
    response = requests.get(url)
    data = response.json()

    return data["blue"]["value_sell"]
""""
# Función para obtener las publicaciones de guitarras eléctricas en Mercado Libre
def obtener_publicaciones_guitarras():
    url = "https://api.mercadolibre.com/sites/MLA/search?q=guitarra+electrica"
    response = requests.get(url)
    return response.json()["results"]
"""


def obtener_publicaciones_guitarras():
    url = "https://api.mercadolibre.com/sites/MLA/search?q=guitarra+electrica"
    response = requests.get(url)
    
    # Revisar el status code de la respuesta para asegurar que la solicitud fue exitosa
    if response.status_code == 200:
        data = response.json()
        
        # Logging de la estructura de la respuesta para depuración
        logger.debug("Estructura de la respuesta: %s", data)
        
        if "results" in data:
            # Formatear el HTML para guardarlo en el log
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            pretty_html = soup.prettify()
            
            # Guardar el HTML formateado en el log
            logger.debug("HTML formateado: %s", pretty_html)
            
            return data["results"]
        else:
            logger.error("Error: No se encontró la clave 'results' en la respuesta de la API.")
            return []
    else:
        logger.error("Error: La solicitud a la API falló con status code %s.", response.status_code)
        return []






# Función para convertir el precio a dólares
def convertir_precio_a_dolares(precio_ars, tipo_cambio):
    return precio_ars / tipo_cambio

# Función para obtener los enlaces de guitarras baratas
def obtener_enlaces_guitarras_baratas(publicaciones, tipo_cambio):
    enlaces_baratas = []
    precios_por_modelo = {}

    for publicacion in publicaciones:
        titulo = publicacion["title"]
        precio_ars = publicacion["price"]
        link = publicacion["permalink"]
        precio_usd = convertir_precio_a_dolares(precio_ars, tipo_cambio)

        if titulo in precios_por_modelo:
            precios_por_modelo[titulo].append((precio_usd, link))
        else:
            precios_por_modelo[titulo] = [(precio_usd, link)]

    for modelo, precios_links in precios_por_modelo.items():
        precios = [precio for precio, link in precios_links]
        precio_medio_usd = sum(precios) / len(precios)
        for precio_usd, link in precios_links:
            if precio_usd < (precio_medio_usd / 2):
                enlaces_baratas.append(link)

    return enlaces_baratas

# Función para abrir los enlaces en Google Chrome
def abrir_enlaces(enlaces):
    for enlace in enlaces:
        webbrowser.open(enlace)

# Ejecutar el script
if __name__ == "__main__":
    tipo_cambio = obtener_tipo_cambio_blue()
    publicaciones = obtener_publicaciones_guitarras()
    enlaces_baratas = obtener_enlaces_guitarras_baratas(publicaciones, tipo_cambio)
    print(tipo_cambio)
    print("\n")
    print(enlaces_baratas)
    print("\n")

    logging.basicConfig(filename='Guitarras.log', encoding='utf-8',level = logging.INFO, format='%(message)s')
    logging.info(publicaciones)
    print("\n")

    """"
    if enlaces_baratas:
        abrir_enlaces(enlaces_baratas)
    else:
        logging.info("No se encontraron guitarras más baratas que la mitad del precio medio en dólares.")
    """