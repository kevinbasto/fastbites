import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';

@Injectable({
  providedIn: 'root'
})
export class DataImporterService {

  constructor() { }

  importMenu(file: File): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      let type = file.type.split("/")[1];
      switch (type) {
        case 'json':
          file.text()
          .then((result) => {
            let menu : Menu = JSON.parse(result);
            resolve(menu);
          });
          break;
        case 'xlsx':
          reject('Tipo de archivo no soportado');
          break;
        default:
          reject('Tipo de archivo no soportado');
      }
    });
  }

  
}
