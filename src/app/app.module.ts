// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
