# Proyecto: Backend + Frontend (MongoDB)

Descripción

- Backend en Node.js + Express que expone un endpoint de agregación: `/api/reporte-ventas`.
- Frontend en Angular (carpeta `frontend`) que consume la API.

Requisitos

- Node.js (v18+ recomendada)
- pnpm
- MongoDB (mongod) corriendo localmente

Estructura

- `server.js` - servidor Express (puerto 3000)
- `frontend/` - aplicación Angular (dev server en puerto 4200)

Instalación y ejecución (desarrollo)

1. Clona o copia el proyecto en tu máquina.

2. Backend: instala dependencias e inicia el servidor

```bash
cd backend_tp_mongodb
pnpm install
pnpm start # o: node server.js
```

El backend escucha en `http://localhost:3000` y expone la API en `/api/reporte-ventas`.

3. Frontend: abre otra terminal e inicia la app Angular

```bash
cd backend_tp_mongodb/frontend
pnpm install
pnpm start
```

Angular normalmente corre en `http://localhost:4200`.

MongoDB

- Asegúrate de tener `mongod` corriendo localmente.
- Por defecto el backend usa el URI `mongodb://127.0.0.1:27017` y la base de datos `hardware_store`.

Insertar datos de ejemplo (mongosh)

Abre `mongosh` y ejecuta:

```js
use hardware_store
db.ventas.insertMany([
  { producto: 'SSD 1TB', categoria: 'Almacenamiento', precio: 120, cantidad: 2, fecha: new Date('2026-05-10') },
  { producto: 'Memoria RAM 16GB', categoria: 'Memoria', precio: 80, cantidad: 4, fecha: new Date('2026-05-11') },
  { producto: 'SSD 500GB', categoria: 'Almacenamiento', precio: 70, cantidad: 1, fecha: new Date('2026-05-12') },
  { producto: 'Procesador i7', categoria: 'Procesadores', precio: 350, cantidad: 1, fecha: new Date('2026-05-12') }
])
```

Probar la API

- Abre `http://localhost:3000/api/reporte-ventas` en el navegador o usa `curl`/Postman.
- Si ves `[]`, verifica que la colección `ventas` tenga documentos y que la base de datos sea `hardware_store`.

Servir frontend desde el backend (opcional)

1. Construir el frontend:

```bash
cd frontend
pnpm run build
```

2. Configurar `server.js` para servir archivos estáticos desde `frontend/dist` (ajusta ruta si Angular genera otra carpeta). Por ejemplo, agregar:

```js
import path from 'path'
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/dist/index.html')))
```

---

Creado para facilitar ejecución local del frontend y backend con MongoDB.
