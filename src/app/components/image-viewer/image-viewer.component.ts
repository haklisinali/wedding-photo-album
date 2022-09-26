import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImagesActions } from 'src/app/store/images/images.actions';
import { ImagesState } from 'src/app/store/images/images.state';
import { ImageType } from '../image/image.component';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}


@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  selectedImage?: ImageType;
  isFirstPhoto: boolean;
  isLastPhoto: boolean;

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.select(ImagesState.selectedImage).subscribe((image: ImageType | undefined) => {
      this.selectedImage = image;
      this.isFirstPhoto = image.id == 1 ? true : false;
      this.isLastPhoto = image.id == 313 ? true : false;
    })
  }

  @HostListener('document:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent){

    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.selectedImage.id < 313) {
      this.nextImage();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.selectedImage.id > 1) {
      this.previousImage();
    }
  }

  previousImage():void {
    this._store.dispatch(new ImagesActions.SelectPreviousImage);

  }

  nextImage():void {
    this._store.dispatch(new ImagesActions.SelectNextImage);
  }

}
