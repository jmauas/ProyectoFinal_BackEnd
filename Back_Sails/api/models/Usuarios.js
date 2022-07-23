/**
 * Usuarios.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    username: {
      type: "String",
    },
    nombre: {
        type: "String",
    },
    apellido: {
        type: "String",
    },
    domicilio: {
        type: "String",
    },
    localidad: {
        type: "String",
    },
    provincia: {
        type: "String",
    },
    email: {
        type: "String",
    },
    dni: {
        type: "Number",
    },
    codPais: {
        type: "String",
    },
    tel: {
        type: "String",
    },
    password: {
        type: "String",
    },
    img: {
        type: "String",
    }
  }
};

