import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesRepoService {

  

  constructor(
    private firestore: Firestore
  ) { }

  create() {}

  get() {}

  update() {}

  remove() {}
}
