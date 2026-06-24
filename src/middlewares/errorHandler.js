const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ErrorNoEncontrado") {
    return res.status(404).json({ error: err.message });
  }

  if (err.name === "ErrorDatoInvalido") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ error: "Error de validación", detalles: messages });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({ error: "El valor ingresado ya se encuentra registrado" });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ error: "Formato de ID inválido" });
  }

  res.status(500).json({ error: "Error interno del servidor" });
};

module.exports = errorHandler;
