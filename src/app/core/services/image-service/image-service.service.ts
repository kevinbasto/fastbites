import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor() { }

  uploadImage(route: string, file: File) {}

  removeImages(path: string) {}

}
