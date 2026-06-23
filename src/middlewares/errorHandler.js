const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "El valor ya existe",
      detalles: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      error: "Violación de integridad referencial",
    });
  }

  res.status(500).json({ error: "Error interno del servidor" });
};

module.exports = errorHandler;
