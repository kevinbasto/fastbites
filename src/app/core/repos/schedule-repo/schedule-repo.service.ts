import { Injectable } from '@angular/core';
import { Schedule } from '../../entities/schedule';
import { MenuRepoService } from '../menu-repo/menu-repo.service';
import { AuthService } from '../../services/auth/auth.service';
import { v6 as uuid } from "uuid";
import { Menu } from '../../entities/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class schedulesRepoService {

  uid! : string;

  constructor(
    private menuRepo : MenuRepoService,
    private authServ: AuthService
  ) { }

  async createSchedule(schedule: Partial<Schedule>) {
    try {
      let uid = await this.authServ.getUID();
      schedule.id = uuid();
      let schedules = (await this.menuRepo.fetchMenu(uid))?.schedules;
      if(!schedules) schedules = [];
      schedules?.push(schedule as Schedule);
      await this.menuRepo.updateMenu(uid, { schedules });
    } catch (error) {
      throw error;
    }
  }

  fetchSchedules() {
    return new Observable<Array<Schedule>>((obs) => {
      this.menuRepo.ObserveMenu().subscribe((menu : Menu) => {
        if(menu.schedules){
          obs.next(menu.schedules);
        } else {
          this.authServ.getUID()
          .then((uid : string) => {
            this.menuRepo.updateMenu(uid, { schedules: [] })
            .then((result) => {
              obs.next([]);
            }).catch((err) => {
              obs.error(err);
            });
          }).catch((err) => {
            obs.error(err);
          });
        }

      });
    })
  }

  async updateSchedule(schedule: Schedule) {
    try {
      let uid : string = await this.authServ.getUID();
      let schedules = (await this.menuRepo.fetchMenu(uid))?.schedules;
      schedules  = schedules?.map((cat : Schedule) => {
        if(cat.id == schedule.id) cat = schedule;
        return cat;
      });
      await this.menuRepo.updateMenu(uid, { schedules });
    } catch (error) {
      throw error;
    }
  }

  async deleteSchedule(schedule: Schedule) {
    try {
      let uid = await this.authServ.getUID();
      let schedules = (await this.menuRepo.fetchMenu(uid))?.schedules;
      schedules = schedules?.filter((cat: Schedule) => cat.id != schedule.id);
      await this.menuRepo.updateMenu(uid, { schedules });
    } catch (error) {
      throw error;
    }
  }
}
