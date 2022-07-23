/**
 * Mensajes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    socketId: {
      type: "String",
    },
    nombre: {
        type: "String",
    },
    apellido: {
        type: "String",
    },
    edad: {
        type: "Number",
    },
    alias: {
        type: "String",
    },
    avatar: {
        type: "String",
    },
    fh: {
      type: "String",
      columnType: "datetime",
    },
    text: {
        type: "String",
    }
  }
};

