import { Injectable } from '@angular/core';
import { Firestore, query, addDoc, collection, deleteDoc, doc, getDocs, updateDoc, where, orderBy, getDoc, collectionData } from '@angular/fire/firestore';
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
      let refq = query(colRef, where('active', '==', true))
      return collectionData(refq)
    } catch (error) {
      throw error;
    }
  }

  async update(order: Order) {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/orders/${order.id!}`);
      await updateDoc(docRef, {...order});
    } catch (error) {
      throw error;
    }
  }

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
