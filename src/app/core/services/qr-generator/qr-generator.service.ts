import { Injectable } from '@angular/core';
import * as Qrcode from "qrcode";

@Injectable({
  providedIn: 'root'
})
export class QrGeneratorService {

  constructor() { }

  async renderQrFromUrl(url: string) : Promise<string> {
    try {
      let qr = await Qrcode.toDataURL(url);
      return qr;
    } catch (error) {
      throw error;
    }
  }
}
