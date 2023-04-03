interface IProduct extends IProductRequest {
  id: number;
  expirationDate: Date;
}
interface IFilteredProductRequest {
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  calories: number;
}

interface IProductRequest {
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  calories?: number;
}

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
  calories: number;
}



interface IPrice {
  price: number;
}

export {
  IProduct, ICleaningProduct, IFoodProduct, IProductRequest, IPrice, IFilteredProductRequest,};
