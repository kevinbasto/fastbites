import { Category } from "./category";
import { Product } from "./product";
import { Submenu } from "./submenu";
import { Schedule } from "./schedule";


export interface Menu{
    submenus: Array<Submenu>
    categories: Array<Category>;
    products: Array<Product>;
    schedules: Array<Schedule>;
}