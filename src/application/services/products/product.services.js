import Product from "../../../domain/entities/product.entitie.js";
import ProductRepository from "../../../interfaces/repositories/productRepository.js";

export async function createProduct(productData) {
  const ur = new ProductRepository();
  const product = new Product(productData);
  const aux = await ur.findByCode(product.code);
  if (aux) {
    throw new Error(
      `The Product with ID ${product.code} already exists! `
    );
  }
  return ur.create(product);

}

export async function updateProduct(code, productData) {
  const ur = new ProductRepository();
  const product = new Product(productData);
  return ur.update(code,product);
}

export async function findAllProducts() {
  const ur = new ProductRepository();
  return ur.findAll();
}

export async function findByCode(code) {
  const ur = new ProductRepository();
  return ur.findByCode(code);
}

export async function deleteProduct(code) {
  const ur = new ProductRepository();
  return ur.delete(code);
}