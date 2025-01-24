import { CheckoutItem } from "./checkout-item";

export interface Order {
    id?: string;
    name: string;
    details?: string;
    items: Array<CheckoutItem>;
    date: Date;
    active: boolean;
    total: number;
    phone: string;
    type: string;
    debitOrCredit: string;
    status: "PROCESSING" |"CANCELLED" | "COMPLETED"
}
