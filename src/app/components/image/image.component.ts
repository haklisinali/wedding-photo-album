import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImagesActions } from 'src/app/store/images/images.actions';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { OverlayService } from '../overlay/overlay.service';

export type ImageType = {
  id: number,
  url: string
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() imageConfig: ImageType;

  constructor(
    private _overlaySerivce: OverlayService,
    private _store: Store
  ) { }

  viewImage(): void {
    this._store.dispatch(new ImagesActions.SelectImage(this.imageConfig.id))
    const ref = this._overlaySerivce.open(ImageViewerComponent)
  }
}
