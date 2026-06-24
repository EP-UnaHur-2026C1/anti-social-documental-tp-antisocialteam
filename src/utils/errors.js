class ErrorNoEncontrado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorNoEncontrado";
    this.statusCode = 404;
  }
}

class ErrorDatoInvalido extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorDatoInvalido";
    this.statusCode = 400;
  }
}

module.exports = {
  ErrorNoEncontrado,
  ErrorDatoInvalido,
};
