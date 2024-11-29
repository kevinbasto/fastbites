import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from './personalization.service';

@Component({
  selector: 'app-personalization',
  standalone: true,
  imports: [],
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss'
})
export class PersonalizationComponent implements OnInit{

  constructor(
    private personalizationServ: PersonalizationService
  ) {}

  ngOnInit(): void {
    
  }
}
