import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Submenu } from '../../../../../core/entities/submenu';
import { Menu } from '../../../../../core/entities/menu';
import { Category } from '../../../../../core/entities/category';
import { weekDays } from '../../../../../shared-forms/submenu-form/picker-theme';

@Component({
  selector: 'app-view-submenu',
  templateUrl: './view-submenu.component.html',
  styleUrl: './view-submenu.component.scss'
})
export class ViewSubmenuComponent {

  submenu: Submenu;
  categories: Array<Category> = [];
  weekDays = weekDays;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { submenu: Submenu, menu: Menu },
    public dialogRef: MatDialogRef<ViewSubmenuComponent>,
  ) {
    this.submenu = data.submenu;
    for(let category of data.menu.categories){
      let found = false;
      for(let catId of this.submenu.categories){
        if(category.id == catId)
          found = true;
      }
      if(found)
        this.categories.push(category);
    }
  }

}
