import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CropperOptions, CropperPosition, ImageCroppedEvent } from 'ngx-image-cropper';
import { CroppedImage } from '../../core/generics/cropped-images';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss'
})
export class AppImageCropperComponent {

  @Input() image? : File
  @Input() url? : string;
  @Output() croppedImage : EventEmitter<CroppedImage> = new EventEmitter()
  cropper?: CropperPosition

  async handleCroppedImage(cropped : ImageCroppedEvent) {
    let cropperPosition = cropped.cropperPosition;
    let blob = cropped.blob;
    let format = cropped.blob?.type;
    let file : File = new File([blob!], `cropped.${format?.split("/")[1]}`, {type : cropped.blob?.type});
    this.croppedImage.emit({position: cropperPosition, image: file});
  }

}
