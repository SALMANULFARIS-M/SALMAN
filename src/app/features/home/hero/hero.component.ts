import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { ThreeBackgroundComponent } from '../../../shared/animations/three-background/three-background.component';
import { PlatformService } from '../../../core/services/platform.service';
import { GsapAnimationService } from '../../../shared/animations/service/gsap-animation.service';


@Component({
  selector: 'app-hero',
  imports: [CommonModule, ThreeBackgroundComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {

  constructor(private platformService: PlatformService, private animationService: GsapAnimationService
  ) { }

  ngOnInit() {
    if (this.platformService.isBrowser) {
      this.animationService.fadeIn('.my-element');
    }
  }


  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.animationService.animateHeroElement('.hero-image', 0.5);
      this.animationService.fadeInElement('.scroll-down-btn', { y: 30, delay: 0.5 });

    }
  }
}
