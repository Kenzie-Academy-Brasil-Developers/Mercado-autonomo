import express, { json } from "express";
import { Application } from "express-serve-static-core";
import { createProducts, listProducts, deleteProducts, listProductsByid, updateProducts,} from "./logics";
import { checkExistingProductName, checkProductIdExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products/", 
checkExistingProductName,
createProducts);

app.get("/products/",
listProducts);

app.get("/products/:id",
checkProductIdExists, 
listProductsByid);

app.delete("/products/:id",
checkProductIdExists, 
deleteProducts);

app.patch("/products/:id", 
checkExistingProductName, 
checkProductIdExists, 
updateProducts);

const PORT: number = 3001;
const runningMsg = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
