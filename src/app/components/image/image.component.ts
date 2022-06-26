import { Component, Input, OnInit } from '@angular/core';

export type ImageType = {
  key: string,
  url: string
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() imageConfig: ImageType = { key: '', url: ''};

  constructor() { }

  ngOnInit(): void {
    console.log('imageConfig: ', this.imageConfig)
  }

}
