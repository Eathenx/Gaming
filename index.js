const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const app = express();
app.use(cors());

// Inicializar Firebase
app.use(express.json());
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Rutas
const db = admin.firestore();

app.get("/", (req, res) => { //Ruta GET
  res.send("Servidor corriendo Firebase");});

  // Crear documento usuario
app.post("/Gaming/add", async (req, res) => { //Ruta POST
  try {
    const { Pass, Permiso, User } = req.body;    
    // Agregar documento a la colección "Usuarios"   
    const docRef = await db.collection("Usuarios").add({ Pass, Permiso, User }); 
    res.json({ id: docRef.id, message: "Usuario agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

// Obtener datos de los documentos
app.get("/Gaming/ver", async (req, res) => {
  try {
    const items = await db.collection("Usuarios").get();

    const Usuarios = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        Pass: data.Pass,
        Permiso: data.Permiso,
        User: data.User
      };
    });

    res.json(Usuarios); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
const PORT = 3000;app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));