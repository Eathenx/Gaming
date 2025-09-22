const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Crear usuario
  router.post("/add", async (req, res) => {
    try {
      const { CCT, Escuela, Municippio, Turno, Zona } = req.body;
      const docRef = await db.collection("Escuelas").add({ CCT, Escuela, Municippio, Turno, Zona });
      res.json({ id: docRef.id, message: "Escuela agregada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ver Escuelas
  router.get("/ver", async (req, res) => {
    try {
      const items = await db.collection("Escuelas").get();
      const Escuelas = items.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(Escuelas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Eliminar Escuela
  router.delete("/del/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("Escuelas").doc(id).delete();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Modificar Escuela
  router.put("/mod/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      await db.collection("Escuelas").doc(id).update(datos);
      res.json({ message: "cambiado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};