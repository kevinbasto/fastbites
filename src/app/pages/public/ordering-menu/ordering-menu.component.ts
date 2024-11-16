import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderingMenuService } from './ordering-menu.service';

@Component({
  selector: 'app-ordering-menu',
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.scss'
})
export class OrderingMenuComponent implements OnInit {

  id?: string;

  constructor(
    private orderingMenuServ: OrderingMenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.id = queryParams.get("id")?? "";
      if(this.id) this.fetchMenu()
    });
  }

  fetchMenu() {}
  
}
