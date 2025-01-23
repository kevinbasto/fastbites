import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Personalization } from '../../../core/entities/personalization';
import { Product } from '../../../core/entities/product';
import * as qrcode from "qrcode";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as cookie from 'cookie';
import { VisualizeQrComponent } from '../../client/qr-tables/dialogs/visualize-qr/visualize-qr.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {

  private id?: string;
  private cart: Array<Product> = [];

  id$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  personalization: BehaviorSubject<Personalization> = new BehaviorSubject(null as any);
  cart$: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  
  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  setMenu(id: string) {
    this.id = id;
    let cook = cookie.serialize('menuId', id);
    document.cookie = cook;
    this.id$.next(id);
    this.router.navigate(['/public/menu']);
  }

  get menuId() {
    return this.id
  }

  ngOnInit(): void { }

  async shareMenu() { 
    let url = window.location.href;
    let menuId = cookie.parse(document.cookie)['menuId'];
    url = `${url}?id=${menuId}`;
    let qr = await qrcode.toDataURL(url);
    let hideUrl = true;
    const dialog = this.dialog.open(VisualizeQrComponent, {data: {url, qr, hideUrl}});
  }

}
