import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutSkillsComponent } from './features/home/about-skills/about-skills.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
 {
    path: 'a',
    component: AboutSkillsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
