import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
,
  standalone: false})
export class SidebarComponent {

  @Output() close : EventEmitter<void> = new EventEmitter();

}
