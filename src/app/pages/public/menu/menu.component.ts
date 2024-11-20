import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/entities/product';
import { Message } from '../../../core/generics/message';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  activeScan: boolean = false;
  scannerMode: boolean = false;
  stop: boolean = false;
  message?: Message;
  id?: string;
  products?: Array<Product>;

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      let id = queryParams.get("id");
      if (id) {
        this.id = id;
        this.scannerMode = false;
      } else {
        this.scannerMode = true
      }
    });
  }

  processScan(scan: string) {
    if(!this.activeScan){
      this.activeScan = true;
      this.menuService.processScan(scan)
      .then((result) => {
        this.stop = true;
        this.scannerMode = false;
      }).catch((err) => {
        setTimeout(() => {
          this.activeScan = false;
        }, 500);
        this.scannerMode = true;
        this.stop = false;
      });
    }
  }

  
}
