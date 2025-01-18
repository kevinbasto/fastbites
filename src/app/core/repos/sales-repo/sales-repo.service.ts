import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, getDoc, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Sale } from '../../entities/sale';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesRepoService {

  sales$: Observable<Array<Sale>>;

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) {
    this.sales$ = new Observable<Array<Sale>>((observer) => {
      this.auth.getUID()
        .then((uid: string | null) => {
          if (!uid)
            observer.error(new Error("Problem loading the uid"));
          let docId = this.buildDatedoc()
          let docRef = doc(this.firestore, `/users/${uid}/sales/${docId}`);
          (docData(docRef) as Observable<{ sales: Array<Sale> }>).subscribe(sales => {
            if (!sales)
              observer.next([])
            else
              observer.next(sales.sales);
          })
        }).catch((err) => {
          observer.error(err);
        });
    });
  }  

  async create(sale: Sale) {
    try {
      let uid = await this.auth.getUID();
      let docId = this.buildDatedoc();
      let docRef = doc(this.firestore, `/users/${uid}/sales/${docId}`);
      let sales: { sales: Array<Sale> } = (await getDoc(docRef)).data() as any;
      if (!sales)
        await setDoc(docRef, { sales: [sale], date: new Date() });
      else
        await setDoc(docRef, { sales: [...sales.sales, sale] });
    } catch (error) {
      throw error;
    }
  }

  private buildDatedoc() {
    let dateTime = new Date();
    let date : number | string = dateTime.getDate();
    date = date < 10? `0${date}` : date.toString();
    let month : number | string = dateTime.getMonth() + 1;
    month = month < 10? `0${month}` : month.toString();
    let year = dateTime.getFullYear();
    return `${year}-${month}-${date}`;
  }

  async fetchFromDate(date: string) {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/sales/${date}`);
      let data = (await getDoc(docRef)).data() as any
      if (data)
        return data.sales
      else
        return []
    } catch (error) {
      throw error;
    }
  }

  update() { }

  remove() { }

}
