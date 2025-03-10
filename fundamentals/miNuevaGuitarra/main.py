from api_requests import obtener_tipo_cambio_blue, obtener_publicaciones_guitarras,obtener_publicaciones_guitarras_amazon
from scraper import obtener_enlaces_guitarras_baratas
from utils import abrir_enlaces
from logger import logger

if __name__ == "__main__":
    tipo_cambio = obtener_tipo_cambio_blue()
    publicaciones = obtener_publicaciones_guitarras(pages=3)
    amazon_publicaciones = obtener_publicaciones_guitarras_amazon(pages=3)
    if publicaciones:
        logger.info("Publicaciones obtenidas: %d", len(publicaciones))
        enlaces_baratas = obtener_enlaces_guitarras_baratas(publicaciones, amazon_publicaciones, tipo_cambio)
        
        if enlaces_baratas:
            abrir_enlaces(enlaces_baratas)
        else:
            logger.info("No se encontraron guitarras más baratas que la mitad del precio medio en dólares.")
    else:
        logger.error("No se obtuvieron publicaciones de la API de Mercado Libre.")




