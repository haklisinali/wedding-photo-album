import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MyOverlayRef } from './overlay-ref';
import { OverlayComponent } from './overlay.component';

/**
 * https://github.com/mainawycliffe/ng-cdk-overlay-demo
 */

 interface ImagePreviewDialogConfig {
  panelClass?: string[];
  hasBackdrop?: boolean;
  backdropClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  sub: Subscription;
	overlayRef: any;
  private afterClosed = new Subject<any>();
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(
    content: Type<any>
  ): MyOverlayRef<R> {
    this.close(null);
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active', 'is-clipped'],
      backdropClass: 'cdk-overlay-transparent-backdrop'    
    });

    this.overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<R, T>(this.overlayRef, content);

    const injector = this.createInjector(myOverlayRef, this.injector);
    this.overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  close=(data: any)=> {
		this.sub && this.sub.unsubscribe();
		if (this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = null;
			this.afterClosed.next(data)
		}
	}
}