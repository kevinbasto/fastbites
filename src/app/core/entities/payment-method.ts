export interface PaymentMethod {
    brand: string;
    creditOrDebit: string;
    expMonth: number;
    expYear: number;
    last4: string;
    name: string;
}
