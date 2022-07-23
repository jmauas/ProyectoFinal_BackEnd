/**
 * Ordenes_items.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    nombre: {
      type: "String",
    },
    categ: {
        type: "String",
    },
    descrip: {
        type: "String",
    },
    img: {
        type: "String",
    },
    sku: {
        type: "String",
    },
    precio: {
        type: "Number",
    },
    stock: {
        type: "Number",
    },
    cantidad: {
        type: "Number",
    },
    idOrden: {
        type: "String",
    },
    total: {
        type: "Number",
    }
  }
};

