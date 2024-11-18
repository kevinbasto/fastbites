import { Timestamp } from "@angular/fire/firestore";
import { CheckoutItem } from "./checkout-item";

export interface Sale {
    date: Date | Timestamp;
    name: string;
    total: number;
    orderId: string;
    // items: Array<CheckoutItem>;
}
