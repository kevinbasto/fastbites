import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar : MatSnackBar
  ) { }

  openMessage(message: string, time?: number){
    this.snackbar.open(message, "ok", {
      duration: time?? 1000
    })
  }
}
