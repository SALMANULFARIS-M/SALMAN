import { AfterViewInit, Component, ComponentRef, ElementRef, HostListener, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';
import { SkillsComponent } from './skills/skills.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../core/services/platform.service';

gsap.registerPlugin(ScrollTrigger, CustomEase,);
@Component({
  selector: 'app-home',
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  sections = [
    { name: 'hero', component: HeroComponent },
    { name: 'about', component: AboutSkillsComponent },
    { name: 'skills', component: SkillsComponent }
  ];

  currentIndex = 0;
  isAnimating = false;
  isLoading = false;
  private compRef!: ComponentRef<any>;
  private touchStartY = 0;

  constructor(private router: Router, private route: ActivatedRoute, private platformService: PlatformService) { }

  ngAfterViewInit() {
  if (this.platformService.isBrowser) {
    const sectionName = this.route.snapshot.paramMap.get('section');
    const index = this.sections.findIndex(s => s.name === sectionName);
    this.currentIndex = index !== -1 ? index : 0;
    Promise.resolve().then(() => this.loadSection(this.currentIndex));
  }
  }
  async loadSection(index: number) {
    this.isLoading = true;
    if (this.compRef) this.compRef.destroy();
    const component = this.sections[index].component as import('@angular/core').Type<any>;
    this.compRef = this.container.createComponent(component);
    this.animateIn(this.compRef.location.nativeElement);
    this.isLoading = false;
  }

animateIn(el: HTMLElement) {
  console.log(el); // Check this logs a real element
  gsap.fromTo(
    el,
    { opacity: 0, rotateX: 90, transformOrigin: 'top center' },
    { opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out' }
  );
}


  navigateTo(index: number) {
    if (index < 0 || index >= this.sections.length || this.isAnimating) return;
    this.isAnimating = true;
    const next = this.sections[index];
    this.animateOut(this.compRef.location.nativeElement, () => {
      this.currentIndex = index;
this.router.navigate([next.name], { skipLocationChange: false });
      this.loadSection(index);
      this.isAnimating = false;
    });
  }

  animateOut(el: HTMLElement, done: () => void) {
    gsap.to(el, {
      opacity: 0,
      rotateX: -90,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: done,
    });
  }

  nextSection() {
    this.navigateTo(this.currentIndex + 1);
  }

  previousSection() {
    this.navigateTo(this.currentIndex - 1);
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') this.nextSection();
    else if (e.key === 'ArrowUp') this.previousSection();
  }

  @HostListener('wheel', ['$event'])
  handleWheel(e: WheelEvent) {
    if (e.deltaY > 0) this.nextSection();
    else this.previousSection();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.touchStartY = e.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    const deltaY = e.changedTouches[0].clientY - this.touchStartY;
    if (deltaY > 50) this.previousSection();
    else if (deltaY < -50) this.nextSection();
  }
}



