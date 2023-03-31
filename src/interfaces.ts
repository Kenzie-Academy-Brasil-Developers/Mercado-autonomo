
interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food";
  expirationDate: Date;
}

interface ICleaningProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food";
  expirationDate: Date;
}

interface IFoodProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food";
  expirationDate: Date;
  calories: number;
}

type TProductsRequest = Omit<IProduct, "id" | "expirationDate">

export { IProduct, ICleaningProduct, IFoodProduct, TProductsRequest}