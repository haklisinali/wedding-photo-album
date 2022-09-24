import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImagesActions } from 'src/app/store/images/images.actions';
import { ImagesState } from 'src/app/store/images/images.state';
import { ImageType } from '../image/image.component';


@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  selectedImage?: ImageType;

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.select(ImagesState.selectedImage).subscribe((image: ImageType | undefined) => {
      this.selectedImage = image;
    })
  }

  previousImage():void {
    this._store.dispatch(new ImagesActions.SelectPreviousImage);

  }

  nextImage():void {
    this._store.dispatch(new ImagesActions.SelectNextImage);
  }
}
