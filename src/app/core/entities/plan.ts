export interface Plan {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    perks: Array<string>;
    price: number,
    permissions : { [key : string] : boolean };
    stripeId: string;
}
