import { products } from "../../infrastructure/database/models/Products.js";

class ProductRepository{
  async create(productData){
    const {code, name, description, price, stock } = productData;
    const product = await products.create({ code, name, description, price, stock });
    const aux = await products.findOne({
      where: {code: product.code}
    });
    return aux;
  }

  async findByCode(code){
    const product = await products.findOne({
      where: {
        code: code
      }
    })
    return product;
  }

  async update(code, productData){
    await products.update(productData, {
      where:{code: code}
    });
    return this.findByCode(code);
  }

  async findAll() {
    return products.findAll();
  }

  async delete(code) {
    const product = await this.findByCode(code);
    if (product) {
        await products.destroy({ where: { code: code } });
        return true;
    }
    return false;
}
}

export default ProductRepository;