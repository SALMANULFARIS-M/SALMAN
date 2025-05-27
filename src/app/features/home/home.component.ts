import { Component, ComponentRef, HostListener, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';
import { SkillsComponent } from './skills/skills.component';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../core/services/platform.service';
import { LucideAngularModule } from 'lucide-angular';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

gsap.registerPlugin(ScrollTrigger, CustomEase,);
@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  validSections = ['about', 'skills', 'projects', 'contact'];

  sections = [
    { name: 'Hero', path: '', icon: 'home', component: HeroComponent },
    { name: 'About', path: 'about', icon: 'user', component: AboutSkillsComponent },
    { name: 'Skills', path: 'skills', icon: 'badge-check', component: SkillsComponent },
    { name: 'Projects', path: 'projects', icon: 'folderGit2', component: ProjectsComponent },
    { name: 'Contact', path: 'contact', icon: 'contact', component: ContactComponent },
  ];


  currentIndex = 0;
  isAnimating = false;
  isLoading = false;
  private compRef!: ComponentRef<any>;
  private touchStartY = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platformService: PlatformService
  ) { }

  ngOnInit() {

    const section = this.route.snapshot.paramMap.get('section');
    if (section && !this.validSections.includes(section)) {
      this.router.navigate(['/']);
    }
    this.route.paramMap.subscribe(params => {
      const section = this.route.snapshot.paramMap.get('section') || '';
      const index = this.sections.findIndex(s => s.path === section);


      this.currentIndex = index !== -1 ? index : 0;

      // Optionally scroll to the section
      setTimeout(() => {
        if (!this.platformService.isBrowser) return;
        const el = document.getElementById(this.sections[this.currentIndex].name.toLowerCase());
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      const section = this.route.snapshot.paramMap.get('section') || '';
      const index = this.sections.findIndex(s => s.path === section);
      this.loadSection(index !== -1 ? index : 0);
    }
  }

  async loadSection(index: number) {
    this.isLoading = true;
    if (this.compRef) this.compRef.destroy();

    const component = this.sections[index].component as Type<any>;
    this.compRef = this.container.createComponent(component);

    this.currentIndex = index;

    // Defer to next tick to ensure DOM is ready
    setTimeout(() => {
      const el = this.compRef.location.nativeElement;
      if (el) this.animateIn(el);
      this.isLoading = false;
    }, 0);
  }


  animateIn(el: HTMLElement) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        rotateX: -45,
        scale: 0.9,
        filter: 'blur(10px)',
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
      }
    );
  }

  animateOut(el: HTMLElement, done: () => void) {
    gsap.to(el, {
      opacity: 0,
      rotateX: 90,
      scale: 0.85,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power4.in',
      onComplete: done,
    });
  }

  navigateTo(index: number) {
    if (
      index < 0 ||
      index >= this.sections.length ||
      this.isAnimating ||
      index === this.currentIndex
    )
      return;

    this.isAnimating = true;

    this.animateOut(this.compRef.location.nativeElement, () => {
      this.router.navigate([this.sections[index].path], { skipLocationChange: true });
      this.loadSection(index).then(() => {
        this.isAnimating = false;
      });
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
    if (this.isAnimating) return;
    if (e.key === 'ArrowDown') this.nextSection();
    else if (e.key === 'ArrowUp') this.previousSection();
  }

  @HostListener('wheel', ['$event'])
  handleWheel(e: WheelEvent) {
    if (this.isAnimating) return;
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



