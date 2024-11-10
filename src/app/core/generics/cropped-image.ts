import { CropperPosition } from "ngx-image-cropper";

export type CroppedImage = {
    position: CropperPosition;
    image: File;
}