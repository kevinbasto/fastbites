import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';
import { galleryTableConfig, gallerytableHeaders } from './gallery-table.headers';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../core/entities/image';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  displayImages?: Array<Image>;
  photos: Array<Image> = [];

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.galleryService.fetchImages().subscribe((images) => {
      this.photos = images;
      this.displayImages = images.slice(0, this.size);
    });
  }

  createPhoto() {
    this.router.navigate(['/client/gallery/create']);
  }

  editImage(image: Image) {
    this.router.navigate(['/client/gallery/edit', image.id]);
  }

  togglePhoto(image: Image) {
    this.galleryService.togglePhoto(image);
  }

  deletePhoto(image: Image) {
    this.galleryService.deletePhoto(image);
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displayImages = this.photos?.slice(startIndex, endIndex) || [];
  }

}
