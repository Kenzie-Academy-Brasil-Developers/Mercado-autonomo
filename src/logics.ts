import { Request, Response } from "express";
import products from "./database";
import { IProduct, TProductsRequest } from "./interfaces";

const createProducts = (req: Request, res: Response): Response => {
  const productData: TProductsRequest = req.body;
  const newProduct: IProduct = {
    id: new Date().getTime(),
    ...productData,
    expirationDate: new Date(),
  };
  products.push(newProduct);
  return res.status(201).json(newProduct);
};

const listProducts = (req: Request, res: Response): Response => {
  const price: any = req.query.price;
  if (!price) {
    return res.json(products);
  }
  const productFilter = products.filter((prod) => prod.price == price);
  return res.json(productFilter);
};

const listProductsByid = (req: Request, res: Response): Response => {
  const index = res.locals.products.indexProducts
  return res.json(products[index]);
};

const deleteProducts = (req: Request, res: Response): Response => {
  const index = res.locals.products.indexProducts
  products.splice(index, 1);
  return res.status(204).send();
};

const updateProducts = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const findIndexProduct = products.findIndex((prod) => prod.id === id);
  const newProduct = {
    ...products[findIndexProduct],
    ...req.body,
  };
  products[findIndexProduct] = newProduct;
  return res.status(200).json(newProduct);
};

export {
  createProducts,
  listProducts,
  deleteProducts,
  listProductsByid,
  updateProducts,
};
