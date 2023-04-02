import { NextFunction, Request, Response } from "express";
import market from "./database";

const checkProductIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const findProduct = market.findIndex((prod) => prod.id === id);
  if (findProduct === -1) {
    return res.status(404).json({
      error: "Product not found!",
    });
  }

  res.locals.market = {
    idProducts: id,
    indexProducts: findProduct,
  };
  return next();
};

const checkExistingProductName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const findName = market.findIndex((prod) => prod.name === name);
  if (findName !== -1) {
    return res.status(409).json({
      error: "Product already registered",
    });
  }

  next();
};

export { checkProductIdExists, checkExistingProductName };
