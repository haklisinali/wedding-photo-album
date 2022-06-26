import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { ImagesState } from './store/images/images.state';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([ImagesState], {
      developmentMode: !environment.production
    }),
    OverlayModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
