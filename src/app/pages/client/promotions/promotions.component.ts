import { Component, OnInit } from '@angular/core';
import { PromotionsService } from './promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit {
  
  constructor(
    private promotionsServ: PromotionsService
  ) {}

  ngOnInit(): void {
    
  }
}
