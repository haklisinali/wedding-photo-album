import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImagesActions } from 'src/app/store/images/images.actions';
import { ImagesState } from 'src/app/store/images/images.state';
import { ImageType } from '../image/image.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images: ImageType[] = [];
  currentPage = 0;
  noMorePhotos = false;

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.select(ImagesState.galleryList).subscribe((images: ImageType[]) => {
      this.images = images
    })

    this._store.select(ImagesState.noMorePhotos).subscribe((noMorePhotos: boolean) => {
      this.noMorePhotos = noMorePhotos;
    } )

    this.getImagesForCurrentPage()
  }

  loadMore(){
    this.currentPage++;

    this.getImagesForCurrentPage()
  }

  private getImagesForCurrentPage(){
    this._store.dispatch(new ImagesActions.GetImages(this.currentPage))
  }

}
