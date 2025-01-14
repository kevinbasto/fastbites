import { Category } from "./category";
import { Product } from "./product";
import { Submenu } from "./submenu";

export interface Menu{
    submenus: Array<Submenu>
    categories: Array<Category>;
    products: Array<Product>;
}