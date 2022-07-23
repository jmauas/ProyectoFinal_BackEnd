/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    nombre: {
        type: "String",
    },
    descrip: {
        type: "String",
    },
    categ: {
        type: "String",
    },
    img: {
        type: "String",
    },
    precio: {
        type: "Number",
    },
    stock: {
        type: "Number",
    },
    sku: {
        type: "String",
    }
  }
};

