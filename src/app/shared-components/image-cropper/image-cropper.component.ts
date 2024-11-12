import { Component, EventEmitter, input, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CropperOptions, CropperPosition, ImageCroppedEvent } from 'ngx-image-cropper';
import { CroppedImage } from '../../core/generics/cropped-image';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss'
})
export class AppImageCropperComponent {

  
  @Input() image? : File
  @Input() url? : string;
  @Output() croppedImage : EventEmitter<CroppedImage> = new EventEmitter()
  @Input() cropper?: CropperPosition

  cropperPos?: CropperPosition;

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  async setPos() { 
    try {
      this.cropperPos = this.cropper;
    } catch (error) {
      
    }
  }

  async handleCroppedImage(cropped : ImageCroppedEvent) {
    let cropperPosition = cropped.cropperPosition;
    let blob = cropped.blob;
    let format = cropped.blob?.type;
    let file : File = new File([blob!], `cropped.${format?.split("/")[1]}`, {type : cropped.blob?.type});
    this.croppedImage.emit({position: cropperPosition, image: file});
  }

}
