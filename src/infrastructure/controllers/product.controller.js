import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findByCode,
  updateProduct,
} from "../../application/services/products/product.services.js";
import Product from "../../domain/entities/product.entitie.js";

export async function postProduct(req, res) {
  try {
    const product = new Product(req.body);
    const create_product = await createProduct(product);
    res.send(create_product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function putProduct(req, res) {
  const { code } = req.params;
  try {
    const product = new Product(req.body);
    const update_product = await updateProduct(code, product);
    if (!update_product) {
      return res.status(401).json({ message: "Product not found" });
    }
    res.send(update_product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await findAllProducts();
    res.send(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProductByCode(req, res) {
  const { code } = req.params;
  try {
    const product = await findByCode(code);
    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteProductByCode(req, res) {
  const { code } = req.params;
  try {
    const product = await deleteProduct(code);
    if (product) {
      return res
        .status(200)
        .json({ message: "Product was deleted successfully!" });
    } else {
      return res.status(200).json({ message: "Product not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
