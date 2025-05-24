import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class GsapAnimationService {

  constructor() {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /** Generic fade-up */
  fadeIn(selector: string, delay = 0, duration = 1): void {
    gsap.from(selector, {
      opacity: 0,
      y: 50,
      duration,
      delay,
      ease: 'power2.out'
    });
  }

  /** Scroll fade for fade-up animations */
  fadeInOnScroll(selector: string): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  /** Hero image or element fade-in */
  animateHeroElement(selector: string, delay = 0.5): void {
    gsap.fromTo(
      selector,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay,
        ease: 'power2.out'
      }
    );
  }

  animateToggleContent(selector: string): void {
    gsap.fromTo(
      selector,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'all',
      }
    );
  }

  animateToggleContentOut(selector: string): void {
    gsap.to(selector, {
      autoAlpha: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(selector, { clearProps: 'all' });
      },
    });
  }

  staggerFadeInOnScroll(
    targetSelector: string,
    options: { y?: number; duration?: number; stagger?: number } = {}
  ): void {
    const { y = 50, duration = 1, stagger = 0.2 } = options;

    const elements = gsap.utils.toArray(targetSelector);

    if (!elements.length) {
      console.warn('No elements found for selector:', targetSelector);
      return;
    }

    elements.forEach((el: any, index: number) => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay: index * stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true // optional: animate only once
        },
      });
    });
  }

  staggerSectionCards(
    selector: string,
    options: { y?: number; duration?: number; stagger?: number } = {}
  ): void {
    const { y = 50, duration = 0.8, stagger = 0.15 } = options;

    gsap.fromTo(
      selector,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
      }
    );
  }

  fadeInElement(
    selector: string,
    options: { y?: number; duration?: number; delay?: number } = {}
  ): void {
    const { y = 50, duration = 1, delay = 0 } = options;

    gsap.fromTo(
      selector,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
      }
    );
  }

   animateSkillBar(barEl: HTMLElement, level: number) {
    gsap.fromTo(
      barEl,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: true,
      }
    );
  }

  animateSkillValue(spanEl: HTMLElement, level: number) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: level,
      duration: 1,
      roundProps: 'val',
      onUpdate: () => {
        spanEl.textContent = `${obj.val}%`;
      },
    });
  }

  killAnimations(elements: HTMLElement[]) {
    gsap.killTweensOf(elements);
  }


}
