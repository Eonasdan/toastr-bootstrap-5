import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NotificationModalComponent} from './notification-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {BootstrapToast} from './BootstrapToast';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NotificationModalComponent,
    BootstrapToast
  ],
  imports: [
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  entryComponents: [BootstrapToast],
  bootstrap: [AppComponent]
})
export class AppModule { }
