import { Category } from "./category";
import { Product } from "./product";
import { Submenu } from "./submenu";

export interface Schedule{
    id: string;
    openingHour: string,
    closingHour: string
}

export interface Menu{
    submenus: Array<Submenu>
    categories: Array<Category>;
    products: Array<Product>;
    schedules: Array<Schedule>;
}