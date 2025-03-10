import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
import re
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter


def extract_text_positions_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    all_text_positions = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap()
        img_data = pix.tobytes()
        img = Image.open(io.BytesIO(img_data))
        
        # Obtener texto y posiciones usando Tesseract
        data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
        
        text_positions = []
        for i in range(len(data['text'])):
            if data['text'][i].strip():  # Ignorar textos vacíos
                text = data['text'][i]
                x = data['left'][i]
                y = data['top'][i]
                width = data['width'][i]
                height = data['height'][i]
                text_positions.append((text, (x, y, width, height)))
        
        all_text_positions.append((page_num, text_positions))
    
    return all_text_positions

def parse_multiple_choice_from_pdf(all_text_positions):
    all_questions_with_positions = []

    for page_num, text_positions in all_text_positions:
        questions = []
        options = []
        for text, (x, y, width, height) in text_positions:
            if re.match(r'\d+\.', text):  # Detectar una pregunta
                if options:
                    questions.append((question, options))
                    options = []
                question = text
            elif re.match(r'[A-D]\.', text):  # Detectar una opción
                options.append((text, (x, y, width, height)))
        
        if options:
            questions.append((question, options))
        
        all_questions_with_positions.append((page_num, questions))
    
    return all_questions_with_positions

def create_overlay(option_positions, page_size):
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=page_size)
    for _, position in option_positions:
        x, y, width, height = position
        can.setFillColorRGB(0, 0, 0)  # Color negro
        can.rect(x, y, width, height, fill=1)  # Dibujar un rectángulo

    can.save()
    packet.seek(0)
    return PdfReader(packet)

def overlay_pdfs(input_pdf_path, output_pdf_path, questions_with_positions_from_pdf):
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()

    for page_num, questions in questions_with_positions_from_pdf:
        page = reader.pages[page_num]
        option_positions = [opt for _, opts in questions for opt in opts]
        
        overlay = create_overlay(option_positions, page.mediabox)
        overlay_page = overlay.pages[0]
        
        page.merge_page(overlay_page)
        writer.add_page(page)
    
    with open(output_pdf_path, 'wb') as output_pdf:
        writer.write(output_pdf)

# Rutas de los archivos
input_pdf_path = 'cuestionario.pdf'
output_pdf_path = 'cuestionario_oculto.pdf'

# Extraer posiciones de opciones de selección múltiple
all_text_positions = extract_text_positions_from_pdf(input_pdf_path)
questions_with_positions_from_pdf = parse_multiple_choice_from_pdf(all_text_positions)

# Fusionar superposiciones con el PDF original
overlay_pdfs(input_pdf_path, output_pdf_path, questions_with_positions_from_pdf)
