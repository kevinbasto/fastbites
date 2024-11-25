import { Product } from "./product";

export interface CheckoutItem {
    product: Partial<Product>;
    quantity: number;
}
  