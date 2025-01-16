import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';

@Injectable({
  providedIn: 'root'
})
export class DataImporterService {

  constructor() { }

  async importMenu(file: File) : Promise<Menu> {
    throw new Error('Method not implemented.');
  }
}
