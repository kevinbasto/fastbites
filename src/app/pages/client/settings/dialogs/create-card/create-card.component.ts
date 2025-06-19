import { Component } from '@angular/core';
import { Card } from '../../../../../core/entities/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss'
,
  standalone: false})
export class CreateCardComponent {

  constructor(
    private dialogRef: MatDialogRef<CreateCardComponent>
  ) {}

  cancel() {
    this.dialogRef.close(null);
  }

  createCard(card: Card) {
    this.dialogRef.close(card);
  }

}
