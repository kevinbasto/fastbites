import { CheckoutItem } from "./checkout-item";

export interface Order {
    id?: string;
    name?: string;
    details?: string;
    items: Array<CheckoutItem>;
    date: Date;
    active: boolean;
    status: "PROCESSING" |"CANCELLED" | "COMPLETED"
}
