import { PaymentMethod } from "./payment-method";
import { Plan } from "./plan";

export interface Profile{
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethods: Array<PaymentMethod>;
    // plan: Plan;
}