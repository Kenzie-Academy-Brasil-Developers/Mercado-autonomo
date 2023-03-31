import express, { json } from "express";
import { Application } from "express-serve-static-core";
import {
  createProducts,
  listProducts,
  deleteProducts,
  listProductsByid,
  updateProducts,
} from "./logics";
import { middleware } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products/", createProducts);
app.get("/products/", listProducts);
app.get("/products/:id", middleware, listProductsByid);
app.delete("/products/:id", middleware, deleteProducts);
app.patch("/products/:id", updateProducts);

const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
