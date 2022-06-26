import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { ImageModule } from '../image/image.module'

@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    ImageModule
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
