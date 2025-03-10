import pyaudio
import numpy as np

# Configuración del audio
FORMAT = pyaudio.paInt16  # Formato de audio
CHANNELS = 1  # Número de canales
RATE = 44100  # Tasa de muestreo (Hz)
CHUNK = 1024  # Tamaño del buffer

# Inicializar PyAudio
audio = pyaudio.PyAudio()

# Función para desfase 180 grados
def invert_phase(data):
    audio_data = np.frombuffer(data, dtype=np.int16)
    inverted_data = -audio_data
    return inverted_data.tobytes()

# Abrir stream de entrada (micrófono)
stream_input = audio.open(format=FORMAT,
                          channels=CHANNELS,
                          rate=RATE,
                          input=True,
                          frames_per_buffer=CHUNK)

# Abrir stream de salida (altavoces)
stream_output = audio.open(format=FORMAT,
                           channels=CHANNELS,
                           rate=RATE,
                           output=True)

print("Streaming audio con desfase de 180 grados. Presiona Ctrl+C para detener.")

try:
    while True:
        # Leer datos del micrófono
        input_data = stream_input.read(CHUNK)
        
        # Desfase de 180 grados
        output_data = invert_phase(input_data)
        
        # Enviar datos a los altavoces
        stream_output.write(output_data)
except KeyboardInterrupt:
    print("Streaming detenido.")

# Cerrar streams
stream_input.stop_stream()
stream_input.close()
stream_output.stop_stream()
stream_output.close()

# Terminar PyAudio
audio.terminate()
