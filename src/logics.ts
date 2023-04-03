import { Request, Response } from "express";
import market from "./database";
import { IProduct, IProductRequest } from "./interfaces";

const createProduct = (req: Request, res: Response): Response => {
  let number = market.length;
  const requestedProducts: Array<IProductRequest> = req.body;
  const oneYearLater = new Date(
    new Date().setDate(new Date().getDate() + 365)
  );
  const total = requestedProducts.reduce(
    (acc, prod) => acc + prod.price,
    0
  );

  const newProductList: Array<IProduct> = requestedProducts.map((prod) => {
    return { id: ++number, ...prod, expirationDate: oneYearLater };
  });
  market.push(...newProductList);

  return res.status(201).json({
    total: total,
    marketProducts: newProductList,
  });
};

const listAllProducts = (
  req: Request,
  res: Response
): Response => {
  const total = market.reduce((acc, prod) => acc + prod.price, 0);

  return res.status(200).json({
    total: total,
    marketProducts: market,
  });
};

const listProduct = (req: Request, res: Response): Response => {
  const productIndex = res.locals.market.productIndex;
  const product = market[productIndex];
  const teste = {
    ...product,
    expirationDate: product.expirationDate.toISOString(),
  };

  return res.status(200).json(teste);
};

const updateProduct = (req: Request, res: Response): Response => {
  const productRequest = req.body;
  const productIndex = Number(res.locals.market.productIndex);

  for (const key in productRequest) {
    if (key === "id" || key === "expirationDate") {
      delete productRequest[key];
    }
  }

  market[productIndex] = { ...market[productIndex], ...productRequest };
  return res.status(200).json(market[productIndex]);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const productIndex = Number(res.locals.market.productIndex);

  market.splice(productIndex, 1);
  return res.status(204).json();
};

export {
  createProduct,
  listAllProducts,
  listProduct,
  updateProduct,
  deleteProduct,
};
