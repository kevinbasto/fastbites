import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Personalization } from '../../../core/entities/personalization';
import { Product } from '../../../core/entities/product';
import * as qrcode from "qrcode";
import { MatDialog } from '@angular/material/dialog';
import { VisualizeQrComponent } from '../../client/qr-tables/dialogs/visualize-qr/visualize-qr.component';


@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {

  private id?: string;
  private cart: Array<Product> = [];

  personalization: BehaviorSubject<Personalization> = new BehaviorSubject(null as any);
  cart$: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  id$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.cart$.subscribe(cart => this.cart = cart);
    this.id$.subscribe(id => this.id = id);
  }

  async shareTheMenu() {
    const url = window.location.href
    let qr = await qrcode.toDataURL(url);
    const dialog = await this.dialog.open(VisualizeQrComponent, { data: { url, qr }, width: '280px' });
  }

}
