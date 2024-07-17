import { Component } from '@angular/core';
import { PersonalInfoComponent } from '../../components/participants/add-new/personal-info/personal-info.component';
import { PatientProfileComponent } from '../../components/participants/add-new/patient-profile/patient-profile.component';
import { IcfsComponent } from '../../components/participants/overview/icfs/icfs.component';
import { AdherenceStudyComponent } from '../../components/participants/overview/adherence-study/adherence-study.component';

@Component({
  selector: 'app-participant-overview',
  standalone: true,
  imports: [
    PersonalInfoComponent,
    PatientProfileComponent,
    IcfsComponent,
    AdherenceStudyComponent,
  ],
  templateUrl: './participant-overview.component.html',
  styleUrl: './participant-overview.component.scss',
})
export class ParticipantOverviewComponent {}
