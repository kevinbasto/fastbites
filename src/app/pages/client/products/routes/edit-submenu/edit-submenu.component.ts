import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-submenu',
  templateUrl: './edit-submenu.component.html',
  styleUrl: './edit-submenu.component.scss'
})
export class EditSubmenuComponent implements OnInit {

  constructor(
    private editSubmenuServ: EditSubmemuService
  ) { }

  ngOnInit(): void {
    
  }

}
