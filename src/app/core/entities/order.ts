import { CheckoutItem } from "./checkout-item";

export interface Order {
    id?: string;
    name?: string;
    items: Array<CheckoutItem>;
    date: Date;
    completed: boolean;
    status: "PROCESS" |"CANCELLED" | "COMPLETED"
}
