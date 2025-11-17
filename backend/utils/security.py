from fastapi import Request, HTTPException

# Cabeceras HTTP seguras globales
async def add_security_headers(request: Request, call_next):
  response = await call_next(request)
  response.headers["X-Frame-Options"] = "DENY"
  response.headers["X-Content-Type-Options"] = "nosniff"
  response.headers["Referrer-Policy"] = "no-referrer"
  response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
  return response

# Limitar tamaño de las peticiones
async def limit_request_size(request: Request, call_next):
  body = await request.body()
  if len(body) > 1_000_000:  # 1 MB
    raise HTTPException(status_code=413, detail="Petición demasiado grande.")
  # FastAPI volverá a leer el body internamente sin problema en la práctica
  response = await call_next(request)
  return response
