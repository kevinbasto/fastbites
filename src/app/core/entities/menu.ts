import { Category } from "./category";
import { Product } from "./product";

export interface Menu{
    categories: Array<Category>;
    products: Array<Product>;
}