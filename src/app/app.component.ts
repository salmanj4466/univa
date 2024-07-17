import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SigninComponent,
    VerifyEmailComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CommonModule,
    FullCalendarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'univa-health';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'Event 1', date: '2024-05-20' },
      { title: 'Event 2', date: '2024-05-21' },
    ],
  };

  ngOnInit(): void {}

  constructor(private router: Router) {}

  isSigninPage(): boolean {
    return this.router.url === '/signin';
  }
}
