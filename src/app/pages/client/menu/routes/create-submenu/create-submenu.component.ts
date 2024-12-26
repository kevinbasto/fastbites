import { Component, OnInit } from '@angular/core';
import { CreateSubmenuService } from './create-submenu.service';

@Component({
  selector: 'app-create-submenu',
  templateUrl: './create-submenu.component.html',
  styleUrl: './create-submenu.component.scss'
})
export class CreateSubmenuComponent {

  constructor(
    private submenuServ: CreateSubmenuService
  ) {}

}
