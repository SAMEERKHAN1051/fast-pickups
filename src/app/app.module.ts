import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { GalleriaModule } from 'primeng/galleria';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [AppComponent, BookingFormComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    GalleriaModule,
    ToastModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MessagesModule,
    DialogModule,
    ProgressSpinnerModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: true,
      code: 'abcdef',
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
