import { NextFunction, Request, Response } from "express";
import market from "./database";
import { IProductRequest } from "./interfaces";

const validateUniqueProductNames = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productRequest: Array<IProductRequest> | IProductRequest = req.body;
  let itIsDuplicated = false;

  if (req.method === "POST") {
    (productRequest as Array<IProductRequest>).forEach((prod) => {
      market.forEach((marketProduct) => {
        if (prod.name === marketProduct.name) {
          itIsDuplicated = true;
        }
      });
    });
  } else if (req.method === "PATCH") {
    itIsDuplicated = market.some(
      (prod) => prod.name === (productRequest as IProductRequest).name
    );
  }

  if (itIsDuplicated) {
    return res.status(409).json({ error: "Product already registered" });
  }

  return next();
};

const existentProductId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = Number(req.params.id);
  const productIndex = market.findIndex((prod) => prod.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals.market = {
    productIndex: productIndex,
  };

  return next();
};

export { validateUniqueProductNames, existentProductId };
