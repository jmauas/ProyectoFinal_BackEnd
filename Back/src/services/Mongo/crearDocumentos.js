import "./config.js";
import { ProductosModel } from '../../models/productos.model.js';

(async () => {
    try {
        const productos = [
            {
                categ: "reposteria",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/codeland-relleno-nougat-500grs.jpg",
                nombre: "Codeland Relleno Nougat 500 Grs.",
                precio: 70,
                sku: "17",
                created_at: new Date(),
                stock: 100
            },
            {
                categ: "reposteria",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/arte-posa-red-ch-1010-20bc.jpg",
                nombre: "Arte Posa Torta Red Chico 1010 20 BC",
                precio: 35,
                sku: "3",
                created_at: new Date(),
                stock: 10
            },
            {
                categ: "reposteria",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/argen-cereal-1kg.jpg",
                nombre: "Argen Cereal de 1 KG.",
                precio: 25,
                sku: "2",
                created_at: new Date(),
                stock: 40
            },
            {
                categ: "reposteria",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/vara-luminosa-color-50cm.jpg",
                nombre: "Vara Luminosa Color 50 CM",
                precio: 357,
                sku: "23",
                created_at: new Date(),
                stock: 81
            },
            {
                categ: "cotillon",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/baderin-feliz-cumpleanos-celeste-con-letras-dorado-x1.jpg",
                nombre: "Banderin Feliz Cumpleaños X1",
                precio: 45,
                sku: "1",
                created_at: new Date(),
                stock: 410
            },
            {
                categ: "cotillon",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/ballina-pastillaje-500grs.jpg",
                nombre: "Ballina Pastillaje por 500 Gr.",
                precio: 498,
                sku: "4",
                created_at: new Date(),
                stock: 4510
            },
            {
                categ: "cotillon",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/pelota-pelotero-x1.jpg",
                nombre: "Pelota Pelotero X1",
                precio: 18,
                sku: "32",
                created_at: new Date(),
                stock: 6852
            },
            {
                categ: "cotillon",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/vara-luminosa-color-50cm.jpg",
                nombre: "Vara Luminosa Color 50 Cm",
                precio: 357,
                sku: "23",
                created_at: new Date(),
                stock: 48569
            },
            {
                categ: "cotillon",
                descrip: "Descripción detallada del producto que se esta listando en esta sección del e-commerce.",
                img: "/prods/gorro-egresado-plastico-x1.jpg",
                nombre: "Gorro Egresado Plástico X1",
                precio: 341,
                sku: "51",
                created_at: new Date(),
                stock: 6778
            }
        ];
        await ProductosModel.create(productos);

        logger.info('PRODUCTOS CREADOS CON ÉXITO.')
    } catch (error) {
        logger.error(error);
    }
})();