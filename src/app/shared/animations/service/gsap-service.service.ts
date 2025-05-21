import { ElementRef, Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapServiceService {

  constructor() { }

  animate3DSlideFade(elem: ElementRef, delay = 0) {
    gsap.fromTo(
      elem.nativeElement,
      {
        opacity: 0,
        y: 50,
        rotationX: 15,
        transformOrigin: 'center center',
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /**
   * Animate icon with subtle scale bounce when toggling.
   */
  animateIconScale(elem: ElementRef) {
    gsap.fromTo(
      elem.nativeElement,
      { scale: 1 },
      { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    );
  }

}
