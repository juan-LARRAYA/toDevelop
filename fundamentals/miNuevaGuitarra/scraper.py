def obtener_enlaces_guitarras_baratas(ml_publicaciones, amazon_publicaciones, tipo_cambio_blue):
    enlaces_baratas = []

    # Crear un diccionario para los precios de Amazon por modelo
    amazon_precios = {pub['title']: pub['price'] for pub in amazon_publicaciones}

    for publicacion in ml_publicaciones:
        title = publicacion.get("title")
        precio_ml = float(publicacion.get("price", 0)) / tipo_cambio_blue
        precio_amazon = amazon_precios.get(title)

        if precio_amazon and precio_ml/2 < precio_amazon:
            enlaces_baratas.append((title, publicacion.get("permalink"), precio_ml, precio_amazon))

    return enlaces_baratas

