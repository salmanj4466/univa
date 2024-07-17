import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.scss',
})
export class ParticipantListComponent {}
