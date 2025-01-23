import { Injectable } from '@angular/core';
import { AnnouncementsRepoService } from '../../../../../core/repos/announcements-repo/announcements-repo.service';
import { Announcement } from '../../../../../core/entities/announcement';

@Injectable({
  providedIn: 'root'
})
export class CreateAnnouncementService {

  constructor(
    private announcementsRepo: AnnouncementsRepoService
  ) { }

  createAnnouncement(announcement: Partial<Announcement>) {
    return this.announcementsRepo.createAnnouncement(announcement as Announcement);
  }
}
