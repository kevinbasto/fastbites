import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent implements OnInit {

  isEditing: boolean = false;

  constructor(
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    
  }

}
