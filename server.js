import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: "Servidor de ventas activo. Accede a /api/reporte-ventas" });
});

// ToDo 1: Configurar la URI de conexión local por defecto de MongoDB [cite: 204]
const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);

app.get('/api/reporte-ventas', async (req, res) => {
    try {
        await client.connect();
        
        // ToDo 2: Conectar a la base de datos y colección correctas [cite: 210]
        const database = client.db("hardware_store"); // Nombre de la DB que creaste en Compass [cite: 170, 211]
        const ventas = database.collection("ventas"); // Nombre de la colección 

        // ToDo 3: Reemplazar este arreglo vacío con el Pipeline exportado desde Compass [cite: 213]
        const pipeline = [
          {
            '$match': {
              'precio': {
                '$gt': 0
              }
            }
          }, {
            '$project': {
              'categoria': 1, 
              'cantidad': 1, 
              'recaudacionVenta': {
                '$multiply': [
                  '$precio', '$cantidad'
                ]
              }
            }
          }, {
            '$group': {
              '_id': '$categoria', 
              'totalRecaudado': {
                '$sum': '$recaudacionVenta'
              }, 
              'cantidadItems': {
                '$sum': '$cantidad'
              }, 
              'ticketPromedio': {
                '$avg': '$recaudacionVenta'
              }
            }
          }, {
            '$match': {
              'totalRecaudado': {
                '$gt': 315
              }
            }
          }, {
            '$sort': {
              'totalRecaudado': -1
            }
          }
        ];

        // Ejecutamos la agregación nativa [cite: 217]
        const reporte = await ventas.aggregate(pipeline).toArray(); // [cite: 218]
        res.status(200).json(reporte); // [cite: 219]
        
    } catch (error) {
        console.error("Error en la base de datos:", error); // [cite: 221]
        res.status(500).json({ error: "Error interno del servidor" }); // [cite: 222]
    } finally {
        await client.close(); // [cite: 224]
    }
});

const PORT = 3000; // [cite: 227]
app.listen(PORT, () => {
   console.log(`Servidor de Datos activo en http://localhost:${PORT}`); // [cite: 229]

  });