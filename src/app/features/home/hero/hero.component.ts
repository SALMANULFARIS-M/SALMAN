import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { ThreeBackgroundComponent } from '../../../shared/animations/three-background/three-background.component';
import { PlatformService } from '../../../core/services/platform.service';


@Component({
  selector: 'app-hero',
  imports: [CommonModule, ThreeBackgroundComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {

  constructor(private platformService: PlatformService) {}

  ngOnInit() {
    if (this.platformService.isBrowser) {
      gsap.from('.my-element', { opacity: 0, y: 50, duration: 1 });
    }
  }


  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      gsap.fromTo('.hero-image',
        { y: 50, opacity: 0 }, // FROM these values
        {
          y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power2.out'
        }) // TO these values
      gsap.fromTo('.scroll-down-btn',
        { y: 30, opacity: 0 }, // FROM these values
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power2.out' } // TO these values
      );

    }
  }
}
