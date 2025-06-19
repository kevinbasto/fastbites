import { Component, Input } from '@angular/core';
import { Message } from '../../core/generics/message';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
,
  standalone: false})
export class InfoCardComponent {
  
  @Input() title!: string;
  @Input() message!: string | number;
  @Input() type!: "CURRENCY" | "DATE";
}
