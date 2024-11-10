import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss'
})
export class AppImageCropperComponent {

  @Input() image? : File | string
  @Input() url? : string;
  @Output() croppedImage : EventEmitter<string> = new EventEmitter()

  async handleCroppedImage(cropped : ImageCroppedEvent) {
    console.log(cropped);
    // let file = new File([image.blob], this.image.name)
    // console.log(cropped);
    // let file = cropped.base64;
    // this.croppedImage.emit(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      const cropped = reader.result;
      this.croppedImage.emit(cropped as string)
    };

    // reader.onerror = () => {

    // };

    reader.readAsDataURL(cropped.blob!);
  }

}
