import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Table } from '../../entities/table';
import { v6 as uuid } from "uuid";
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesRepoService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore
  ) { }

  async createTable(table: Table) {
    try {
      const uid = await this.auth.getUID();
      table.id = uuid();
      let docRef = doc(this.firestore, `/users/${uid}/data/tables`);
      let docVal = await getDoc(docRef);
      if(docVal.exists()){
        let tables = (docVal.data() as any).tables;
        tables.push(table);
        await setDoc(docRef, {tables});
      }else{
        await setDoc(docRef, {tables: [table]});
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchTables() : Promise<Array<Table>> {
    try {
      const uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/tables`);
      let docVal = await getDoc(docRef);
      if(docVal.exists())
        return (docVal.data() as any).tables;
      else
        return [];
    } catch (error) {
      throw error;
    }
  }

  observeTables(){
    try {
      return new Observable<Array<Table>>((obs: Observer<Array<Table>>) => {
        this.auth.getUID()
        .then((uid : string) => {
          let docRef = doc(this.firestore, `/users/${uid}/data/tables`);
          (docData(docRef) as Observable<{tables: Array<Table>}>).subscribe(tables => tables? obs.next(tables.tables) : obs.next([]));
        }).catch((err) => {
          obs.error(err);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTable(table: Table) {
    try {
      const uid = await this.auth.getUID();
      let tables = await this.fetchTables();
      tables = tables.map(tab => {
        if(table.id == tab.id)
          tab = table;
        return tab;
      });
      let docRef = doc(this.firestore, `/users/${uid}/data/tables`);
      await setDoc(docRef, {tables});
    } catch (error) {
      throw error;
    }
  }

  async deleteTable(table: Table) {
    try {
      const uid = await this.auth.getUID();
      let tables = await this.fetchTables();
      tables = tables.filter(tab => tab.id != table.id);
      let docRef = doc(this.firestore, `/users/${uid}/data/tables`);
      await setDoc(docRef, {tables});
    } catch (error) {
      throw error;
    }
  }
}
