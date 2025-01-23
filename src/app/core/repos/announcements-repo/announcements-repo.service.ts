import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth/auth.service';
import { Announcement } from '../../entities/announcement';
import { Observable, Observer } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsRepoService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) { }

  // doc: `/users/${uid}/data/announcements`
  fetchAnnouncements() {
    return new Observable<Array<Announcement>>((obs: Observer<Array<Announcement>>) => {
      this.auth.getUID()
      .then((uid : string) => {
        const docRef = doc(this.firestore, `/users/${uid}/data/announcements`);
        (docData(docRef) as Observable<{ announcements: Array<Announcement> }>).subscribe((data) => {
          if(!data){
            setDoc(docRef, { announcements: [] });
            obs.next([]);
          }else{
            obs.next(data.announcements);
          }
        });
      }).catch((err) => {
        obs.error(err);
      });
    });
  }

  async getAnnouncements() {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/announcements`);
      const docVal = await getDoc(docRef);
      if(docVal.exists())
        return (docVal.data() as {announcements: Array<Announcement>}).announcements;
      await setDoc(docRef, {announcements: []});
      return [];
    } catch (error) {
      throw error;
    }
  }

  async createAnnouncement(announcement: Announcement) {
    try {
      announcement.id = uuid();
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/announcements`);
      const docVal = await getDoc(docRef);
      if(!docVal.exists()){
        await setDoc(docRef, { announcements: [announcement]});
      }else{
        let announcements = (docVal.data() as {announcements : Array<Announcement>}).announcements;
        announcements.push(announcement);
        await setDoc(docRef, {announcements});
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAnnouncement(announcement: Announcement) {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/announcements`);
      const docVal = await getDoc(docRef);
      let announcements = (docVal.data() as { announcements : Array<Announcement>}).announcements;
      announcements = announcements.map(ann => {
        if(ann.id == announcement.id)
          ann = {...ann, ...announcement};
        return ann;
      });
      await setDoc(docRef, {announcements});
    } catch (error) {
      throw error;
    }
  }

  async deleteAnnouncement(announcement: Announcement) {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/announcements`);
      const docVal = await getDoc(docRef);
      let announcements = (docVal.data() as { announcements : Array<Announcement>}).announcements;
      announcements = announcements.filter(ann => ann.id != announcement.id);
      await setDoc(docRef, {announcements});
    } catch (error) {
      throw error;
    }
  }
}