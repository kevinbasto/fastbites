import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar : MatSnackBar
  ) { }

  openMessage(message: string){
    this.snackbar.open(message, "ok", {
      duration: 1000
    })
  }
}
