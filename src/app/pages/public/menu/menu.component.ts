import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuService } from './menu.service';
import { Product } from '../../../core/entities/product';
import * as cookie from 'cookie';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  id? : string;
  scan: boolean = false;
  loading? : boolean = true;
  toggle: boolean = false;
  cart: Array<Product> = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    this.menuService.id$.subscribe(id => {
      this.id = id;
      this.scan = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const id = queryParams.get('id');
      const menuStored = cookie.parse(document.cookie)['menuId'];
      if(menuStored && !id){
        this.menuService.setMenu(menuStored);
      }
      if(id){
        this.menuService.setMenu(id)
      }
      else if(!id && !menuStored){
        this.id = '';
        this.loading = false;
        this.scan = true;
        this.router.navigate(['scan'], {relativeTo: this.route})
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => this.close());
    this.menuService.cart$.subscribe(cart => this.cart = cart);
  }

  shareMenu() {
    this.menuService.shareMenu();
  }

  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  close() {
    this.toggle =false;
  }
}
