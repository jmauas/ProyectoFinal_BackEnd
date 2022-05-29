import { faker } from '@faker-js/faker';


class Productos {
    constructor () {
        this.getAll = this.getAll.bind(this);
    }
    async getAll(res) {
        try {
            const response = [];
            for (let i=1;i<=5;i++) {
                const prod = {
                    _id: faker.finance.account(8),
                    nombre: faker.commerce.productName(),
                    descrip: faker.commerce.productDescription(),
                    categ: faker.commerce.department(),
                    img: faker.image.fashion(),
                    precio: faker.commerce.price(),
                    stock: faker.commerce.price(),
                    sku: faker.finance.account(4),
                    created_at: faker.date.past(10) 
                }
                response.push(prod);
            }
            res(response);
        } catch (err) {
            res(err)
        }
    }
}

export default Productos;