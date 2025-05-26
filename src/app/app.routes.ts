import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutSkillsComponent } from './features/home/about-skills/about-skills.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: ':section', component: HomeComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
