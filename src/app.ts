import express, { Application } from "express";
import {createProduct, deleteProduct, listAllProducts, listProduct, updateProduct } from "./logics";
import { validateUniqueProductNames, existentProductId } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post("/products", validateUniqueProductNames, createProduct);
app.get("/products", listAllProducts);
app.get("/products/:id", existentProductId, listProduct);
app.patch("/products/:id", validateUniqueProductNames, existentProductId, updateProduct);
app.delete("/products/:id", existentProductId, deleteProduct);

app.listen(3000, () => {
  console.log("Server is running");
});

