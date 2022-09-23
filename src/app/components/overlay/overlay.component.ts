import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, Type } from '@angular/core';
import { MyOverlayRef } from './overlay-ref';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
})
export class OverlayComponent implements OnInit {
  contentType =  'component';
  content: Type<any>;

  constructor(private ref: MyOverlayRef) {}

  close() {
    this.ref.close();
  }

  ngOnInit() {
    this.content = this.ref.content;
  }
}