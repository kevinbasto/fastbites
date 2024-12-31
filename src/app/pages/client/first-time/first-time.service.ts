import { Injectable } from '@angular/core';
import { Functions, httpsCallableFromURL } from '@angular/fire/functions';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeService {

  constructor(
    private functions: Functions
  ) { }

  check(){
    let callable = httpsCallableFromURL(this.functions, 'https://us-central1-fastbites-321c9.cloudfunctions.net/api');
    callable()
  }
}
