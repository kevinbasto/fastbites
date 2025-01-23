import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from './menu.service';
import { Product } from '../../../core/entities/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  toggle: boolean = false;
  cart: Array<Product> = []

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.menuService.personalization.subscribe(personalization => {

    });
    this.menuService.cart$.subscribe(cart => this.cart = cart);
    this.route.queryParamMap.subscribe(params => {
      let id = params.get('id');
      this.menuService.id$.next(id!);
    })
  }

  shareMenu() {
    this.menuService.shareTheMenu()
  }

  goToLogin() {
    this.router.navigate(['/auth/login'])
  }

  
  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  close(){
    this.toggle = false;
  }


}
