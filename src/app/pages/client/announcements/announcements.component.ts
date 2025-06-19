import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from './announcements.service';
import { announcementsTableConfig, announcementsTableHeaders } from './announcements-table.headers';
import { environment } from '../../../../environments/environment';
import { Announcement } from '../../../core/entities/announcement';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
,
  standalone: false})
export class AnnouncementsComponent implements OnInit {

  headers = announcementsTableHeaders;
  config = announcementsTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayAnnouncements?: Array<Announcement>;
  announcements: Array<Announcement> = [];

  constructor(
    private announcementsService: AnnouncementsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.announcementsService.fetchAnnouncements().subscribe((announcements) => {
      this.announcements = announcements;
      this.displayAnnouncements = announcements.slice(0, this.size);
    });
  }

  createAnnouncement() {
    this.router.navigate(['/client/announcements/create']);
  }

  editAnnouncement(announcement: Announcement) {
    this.router.navigate(['/client/announcements/edit', announcement.id]);
  }

  toggleAnnouncement(announcement: Announcement) {
    this.announcementsService.toggleAnnouncement(announcement);
  }

  deleteAnnouncement(announcement: Announcement) {
    this.announcementsService.deleteAnnouncement(announcement);
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displayAnnouncements = this.announcements?.slice(startIndex, endIndex) || [];
  }

}