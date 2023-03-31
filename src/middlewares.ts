import { NextFunction, Request, Response } from "express";
import products from "./database";


const middleware = ( req: Request, res: Response, next: NextFunction) =>{
    const id = parseInt(req.params.id);
    const findProduct = products.findIndex((prod) => prod.id === id);
    if (findProduct === -1) {
      return res.status(404).json({
        error: "Product not found!",
      });
    }

    res.locals.products = {
        idProducts: id,
        indexProducts: findProduct,
    }
    return next();
}

export { middleware } 