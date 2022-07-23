/**
 * Ordenes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
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
    username: {
        type: "String",
    },
    dni: {
        type: "String",
    },
    tel: {
        type: "String",
    },
    cantTotal: {
        type: "Number",
    },
    total: {
        type: "Number",
    },
    fh: {
        type: "String",
        columnType: "datetime",
    }
  }
};

