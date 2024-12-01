import { CropperPosition } from "ngx-image-cropper";

export interface Product {
    uuid: string;
    name: string;
    category: string;
    description: string;
    cost: number;
    price: number;
    available: boolean;
    rawImage: string;
    croppedImage: string;
    croppedPosition: CropperPosition
}
