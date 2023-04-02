import { Request, Response } from "express";
import moment from "moment-timezone";
import market from "./database";
import {
  IProduct,
  TProductsRequest,
  ICleaningProduct,
  IFoodProduct,
} from "./interfaces";

let nextProductId = 1;

const createProducts = (req: Request, res: Response): Response => {
  const productData: TProductsRequest = req.body;
  const expirationDate = moment().tz("America/Sao_Paulo").toDate();

  const newProduct: IProduct = {
    id: nextProductId,
    ...productData,
    expirationDate,
  };
  market.push(newProduct);
  nextProductId++;

  return res.status(201).json(newProduct);
};

const listProducts = (req: Request, res: Response): Response => {
  const price: any = req.query.price;
  const section: any = req.query.section;

  let products = market;

  if (price) {
    products = products.filter((prod) => prod.price == price);
  }

  if (section === "food") {
    products = products.filter(
      (prod) => (prod as IFoodProduct).calories !== undefined
    );
  }

  return res.json(products);
};

const listProductsByid = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const product = market.find((prod) => prod.id === id);
  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
};

const deleteProducts = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const findIndexProduct = market.findIndex(
    (prod: IProduct | ICleaningProduct) => prod.id === id
  );
  if (findIndexProduct !== -1) {
    market.splice(findIndexProduct, 1);
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
};

const updateProducts = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const findIndexProduct = market.findIndex((prod) => prod.id === id);
  if (findIndexProduct !== -1) {
    const newProduct = {
      ...market[findIndexProduct],
      ...req.body,
    };
    market[findIndexProduct] = newProduct;
    return res.status(200).json(newProduct);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
};

export {
  createProducts,
  listProducts,
  deleteProducts,
  listProductsByid,
  updateProducts,
};
