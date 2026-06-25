require("dotenv").config();
const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const connectDB = require("./config/database");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.redirect("/api-docs"));

app.use("/uploads", express.static(path.join(__dirname, "../assets/uploads")));

app.use("/", routes);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`UnaHur Anti-Social net escuchando en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
  });
});

module.exports = app;
