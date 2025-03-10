import logging

# Crear un logger específico para tu aplicación
logger = logging.getLogger('main_logger')
logger.setLevel(logging.DEBUG)

# Crear otro logger específico para el HTML parseado
html_logger = logging.getLogger('html_logger')
html_logger.setLevel(logging.DEBUG)

# Configuración del handler para el archivo de log del programa (modo 'w' para sobrescribir)
file_handler = logging.FileHandler('program_info.log', mode='w')
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Configuración del handler para el archivo de log del HTML parseado (modo 'w' para sobrescribir)
html_file_handler = logging.FileHandler('html_info.log', mode='w')
html_file_handler.setLevel(logging.DEBUG)
html_file_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s\n')
html_file_handler.setFormatter(html_file_formatter)
html_logger.addHandler(html_file_handler)

# Eliminar cualquier handler existente que envíe mensajes a la consola
for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

# Evitar que los mensajes DEBUG de bibliotecas externas se muestren
logging.getLogger("requests").setLevel(logging.WARNING)

