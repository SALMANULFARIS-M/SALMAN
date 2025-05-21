import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent,AboutSkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
