import { Subject } from 'rxjs';

import { OverlayRef } from '@angular/cdk/overlay';

import { Type } from '@angular/core';

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data?: R;
}

// R = Response Data Type, T = Data passed to Modal Type
export class MyOverlayRef<R = any, T = any> {
  afterClosed$ = new Subject<OverlayCloseEvent<R>>();

  constructor(
    public overlay: OverlayRef,
    public content: Type<any>,
  ) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick'));
  }

  close() {
    this._close('close');
  }

  private _close(type: 'backdropClick' | 'close') {
    this.overlay.dispose();
    this.afterClosed$.next({
      type
    });

    this.afterClosed$.complete();
  }
}