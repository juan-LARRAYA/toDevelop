import PyPDF2

def merge_pages(input_pdf, output_pdf):
    # Abre el archivo PDF de entrada en modo lectura binaria
    with open(input_pdf, 'rb') as file:
        reader = PyPDF2.PdfFileReader(file)
        writer = PyPDF2.PdfFileWriter()

        # Combina las páginas
        for page_num in range(0, reader.numPages, 2):
            if page_num + 1 < reader.numPages:
                # Obtiene dos páginas consecutivas
                page1 = reader.getPage(page_num)
                page2 = reader.getPage(page_num + 1)

                # Crea una nueva página combinada
                combined_page = PyPDF2.pdf.PageObject.createBlankPage(
                    width=page1.mediaBox.getWidth() + page2.mediaBox.getWidth(),
                    height=max(page1.mediaBox.getHeight(), page2.mediaBox.getHeight())
                )
                combined_page.mergeTranslatedPage(page1, 0, 0)
                combined_page.mergeTranslatedPage(page2, page1.mediaBox.getWidth(), 0)

                # Agrega la página combinada al escritor
            
                writer.addPage(combined_page)

        # Guarda el archivo PDF de salida
        with open(output_pdf, 'wb') as output_file:
            writer.write(output_file)

# Uso del programa
input_file = 'Activity Monitor.pdf'
output_file = 'Activity Monitor merge.pdf'
merge_pages(input_file, output_file)
