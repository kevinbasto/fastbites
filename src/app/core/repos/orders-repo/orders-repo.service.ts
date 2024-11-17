import { Injectable } from '@angular/core';
import { Firestore, query, addDoc, collection, deleteDoc, doc, getDocs, updateDoc, where, orderBy, getDoc } from '@angular/fire/firestore';
import { Order } from '../../entities/order';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersRepoService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) { }

  async create(order: Order, uid : string) {
    try {
      let colRef = collection(this.firestore, `/users/${uid}/orders`);
      let doc = await addDoc(colRef, order);
      order.id = doc.id;
      await updateDoc(doc, { id: doc.id });
    } catch (error) {
      throw error;
    }
  }

  async find() {
    try {
      
      let uid = await this.auth.getUID();
      let colRef = collection(this.firestore, `/users/${uid}/orders`);
      let refq = query(colRef, where('completed', '==', 'false'), orderBy('date', 'desc'))
      // getDocs(refq)
      let docs = (await getDocs(colRef)).docs;
      let orders = [];

      for(let doc of docs)
        orders.push(doc.data());
      return orders;
    } catch (error) {
      throw error;
    }
  }

  update() {}

  async delete(id: string) {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/orders/${id}`);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  }
}
