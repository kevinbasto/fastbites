export interface Product {
    uuid: string;
    name: string;
    description: string;
    cost: number;
    price: number;
    available: boolean;
    rawImage: string;
    croppedImage: string;
}
