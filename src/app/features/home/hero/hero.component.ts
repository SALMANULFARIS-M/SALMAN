import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ThreeBackgroundComponent } from '../../../shared/animations/three-background/three-background.component';
import * as THREE from 'three';


@Component({
  selector: 'app-hero',
  imports: [CommonModule, ThreeBackgroundComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {

  // @ts-ignore
  isBrowser: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      gsap.from('.my-element', { opacity: 0, y: 50, duration: 1 });
      // this.logo();
    }
  }
  logo() {
    const logo = document.getElementById("logo");
    let clock = new THREE.Clock(); // Reuse the THREE.js clock for time consistency

    function updateLogo() {
      const time = clock.getElapsedTime();
      const pulse = Math.sin(time * 1.0) * 0.5 + 0.5;

      // Change based on threshold (e.g., 0.5)
      if (logo) {
        if (pulse > 0.5) {
          (logo as HTMLImageElement).src = "/log.svg";
        } else {
          (logo as HTMLImageElement).src = "/logo.svg";
        }
      }

      requestAnimationFrame(updateLogo);
    }

    updateLogo(); // Start the loop
  }
  ngAfterViewInit(): void {

    if (this.isBrowser) {
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
