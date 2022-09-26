import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageViewerComponent } from './image-viewer.component';


@NgModule({
  declarations: [
    ImageViewerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageViewerComponent
  ]
})
export class ImageViewerModule { }
