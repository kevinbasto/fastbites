import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  id? : string;

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      let id = queryParams.get("id");
      if(id)
        this.id = id;
    })
  }
}
