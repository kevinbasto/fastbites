import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';
import { galleryTableConfig, gallerytableHeaders } from './gallery-table.headers';
import { environment } from '../../../../environments/environment';
import { Photo } from '../../../core/entities/photo';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  headers = gallerytableHeaders;
  config = galleryTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayPhotos?: Array<Photo>;
  photos: Array<Photo> = [];

  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit(): void { }

  createPhoto() { }

  updatePhoto(photo: Photo) { }

  togglePhoto(photo: Photo) { }

  deletePhoto(photo: Photo) { }


  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displayPhotos = this.photos?.slice(startIndex, endIndex) || [];
  }

}
