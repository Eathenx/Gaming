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

const usuariosRouter = require("./routes/usuarios")(db);
const EscuelaRouter = require("./routes/Escuelas")(db);
const AlumnosRouter = require("./routes/Alumnos")(db);

app.use("/Gaming", usuariosRouter);
app.use("/Escuela", EscuelaRouter);
app.use("/Alumnos", AlumnosRouter);

app.get("/", (req, res) => {
  res.send("Servidor corriendo Firebase");
});

// Conexión al servidor
const PORT = 3000;app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));