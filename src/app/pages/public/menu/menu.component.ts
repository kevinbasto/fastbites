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
export class MenuComponent implements OnInit{

  scannerMode: boolean = false;
  message?: Message;
  id? : string;
  products?: Array<Product>;

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      let id = queryParams.get("id");
      if(id)
        this.id = id;
    });
  }
}
