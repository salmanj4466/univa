import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AddNewStudyComponent } from './studies/add-new-study/add-new-study.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { StudyListComponent } from './studies/study-list/study-list.component';
import { StudyOverviewComponent } from './studies/study-overview/study-overview.component';
import { AddNewSiteComponent } from './sites/add-new-site/add-new-site.component';
import { SiteOverviewComponent } from './sites/site-overview/site-overview.component';
import { SiteListComponent } from './sites/site-list/site-list.component';
import { AddNewParticipantComponent } from './participants/add-new-participant/add-new-participant.component';
import { ParticipantOverviewComponent } from './participants/participant-overview/participant-overview.component';
import { ParticipantListComponent } from './participants/participant-list/participant-list.component';
import { MyVisitsComponent } from './visits/my-visits/my-visits.component';
import { VisitDataComponent } from './visits/visit-data/visit-data.component';

export const routes: Routes = [
  { path: '', redirectTo: '/add-new-study', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signin-verify', component: VerifyEmailComponent },
  { path: 'add-new-study', component: AddNewStudyComponent },
  { path: 'study-overview', component: StudyOverviewComponent },
  { path: 'study-list', component: StudyListComponent },
  { path: 'add-new-site', component: AddNewSiteComponent },
  { path: 'site-overview', component: SiteOverviewComponent },
  { path: 'site-list', component: SiteListComponent },
  { path: 'add-new-participant', component: AddNewParticipantComponent },
  { path: 'participant-overview', component: ParticipantOverviewComponent },
  { path: 'participant-list', component: ParticipantListComponent },
  { path: 'my-visits', component: MyVisitsComponent },
  { path: 'visit-data', component: VisitDataComponent },
];
