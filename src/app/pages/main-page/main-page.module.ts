import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { GalleryModule } from '../../components/gallery/gallery.module';
import { ImageViewerModule } from 'src/app/components/image-viewer/image-viewer.module';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
]

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GalleryModule,
    ImageViewerModule
  ]
})
export class MainPageModule { }
