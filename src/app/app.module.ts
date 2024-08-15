// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CalendarViewComponent } from './components/visits/my-visits/calendar-view/calendar-view.component';
import { MyVisitsComponent } from './visits/my-visits/my-visits.component';
import { VisitListComponent } from './components/visits/my-visits/visit-list/visit-list.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    FullCalendarModule,
    MyVisitsComponent,
    VisitListComponent,
    CalendarViewComponent
  ],
  providers: [],
  exports:[],
  bootstrap: [AppComponent],
})
export class AppModule {}
