FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias del sistema (opcional, pero útil)
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-traditional curl \
    && rm -rf /var/lib/apt/lists/*

# --- Instalar dependencias Python ---
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# --- AÑADIDO: aseguramos que uvicorn esté instalado ---
RUN pip install --no-cache-dir uvicorn

# Copiamos el código del backend
COPY backend/ /app/

EXPOSE 8000

# --- Ejecutar el servidor ---
# ⚠️ Cambiamos a versión segura con python -m
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
