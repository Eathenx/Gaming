const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Crear usuario
  router.post("/add", async (req, res) => {
    try {
      const { Pass, Permiso, User } = req.body;
      const docRef = await db.collection("Usuarios").add({ Pass, Permiso, User });
      res.json({ id: docRef.id, message: "Usuario agregado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ver usuarios
  router.get("/ver", async (req, res) => {
    try {
      const items = await db.collection("Usuarios").get();
      const Usuarios = items.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(Usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Eliminar usuario
  router.delete("/del/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("Usuarios").doc(id).delete();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Modificar usuario
  router.put("/mod/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      await db.collection("Usuarios").doc(id).update(datos);
      res.json({ message: "cambiado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};


// app.get("/", (req, res) => { //Ruta GET
//   res.send("Servidor corriendo Firebase");});

//   // Crear documento usuario
// app.post("/Gaming/add", async (req, res) => { //Ruta POST
//   try {
//     const { Pass, Permiso, User } = req.body;    
//     // Agregar documento a la colección "Usuarios"   
//     const docRef = await db.collection("Usuarios").add({ Pass, Permiso, User }); 
//     res.json({ id: docRef.id, message: "Usuario agregado" });  
//     } 
//     catch (error) {
//     res.status(500).json({ error: error.message });  
//     }
// });

// // Obtener datos de los documentos
// app.get("/Gaming/ver", async (req, res) => {
//   try {
//     const items = await db.collection("Usuarios").get();
//     const Usuarios = items.docs.map(doc => { // Mapear documentos a un array de objetos
//       const data = doc.data();
//       return {
//         id: doc.id,
//         Pass: data.Pass,
//         Permiso: data.Permiso,
//         User: data.User
//       };
//     });
//     res.json(Usuarios); // Enviar array de usuarios como respuesta en JSON
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete("/Gaming/del/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await db.collection("Usuarios").doc(id).delete();
//     res.json({ message: "Eliminado correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put("/Gaming/mod/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const datos = req.body; 
//     await db.collection("Usuarios").doc(id).update(datos);
//     res.json({ message: "cambiado correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
