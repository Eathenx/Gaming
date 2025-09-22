const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Crear Alumno
  router.post("/add", async (req, res) => {
    try {
      const { Folio, Matricula, Nombre, Periodo, Promedio } = req.body;
      const docRef = await db.collection("Alumnos").add({ Folio, Matricula, Nombre, Periodo, Promedio });
      res.json({ id: docRef.id, message: "Alumno agregado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ver Alumnos
  router.get("/ver", async (req, res) => {
    try {
      const items = await db.collection("Alumnos").get();
      const Alumnos = items.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(Alumnos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Eliminar Alumno
  router.delete("/del/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection("Alumnos").doc(id).delete();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Modificar Alumno
  router.put("/mod/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      await db.collection("Alumnos").doc(id).update(datos);
      res.json({ message: "cambiado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};