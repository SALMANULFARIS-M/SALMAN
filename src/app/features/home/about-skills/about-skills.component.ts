import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code2, Home, LucideAngularModule, User } from 'lucide-angular';
import * as THREE from 'three';
import { ThreeBackgroundAboutComponent } from '../../../shared/animations/three-background-about/three-background-about.component';

@Component({
  selector: 'app-about-skills',
  imports: [CommonModule, LucideAngularModule,ThreeBackgroundAboutComponent],
  templateUrl: './about-skills.component.html',
  styleUrl: './about-skills.component.css'
})

export class AboutSkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChildren('fade') fadeEls!: QueryList<ElementRef>;

  constructor(private platformService: PlatformService) { }
  openSection: string | null = null;
  hoveredSection: string | null = null;

  sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: User,
      content: `
        I architect and build robust web applications using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). My unconventional journey from self-taught coder to professional developer has equipped me with unique problem-solving abilities and relentless determination.
      `
    },
    {
      id: 'journey',
      title: 'Professional Journey',
      icon: Briefcase,
      content: `
        <strong>Brototype Institute (2020–2021)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Intensive self-learning with weekly code reviews</li>
          <li>Built 15+ MEAN stack projects</li>
          <li>Gained debugging and independent learning skills</li>
        </ul>

        <strong class="block mt-4">Freelance Developer (2021–2022)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Delivered 8+ client projects including e-commerce apps</li>
          <li>Handled full-stack delivery with JWT, REST APIs</li>
        </ul>

        <strong class="block mt-4">Incubenta, Bengaluru (2022–Present)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Maintain 4+ production apps for 10,000+ users</li>
          <li>Optimize APIs, mentor juniors, Angular 14+ & Node 18</li>
        </ul>
      `
    },
    {
      id: 'skills',
      title: 'What I Bring',
      icon: Code2,
      content: `
        <strong>Technical Excellence</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Proficient in MEAN stack, CI/CD, Docker, AWS</li>
          <li>Skilled in TypeScript, RxJS, and scalable design</li>
        </ul>

        <strong class="block mt-4">Unique Mindset</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Self-taught discipline and problem-solving mindset</li>
          <li>Team player with clean code principles</li>
        </ul>
      `
    },
    {
      id: 'philosophy',
      title: 'Philosophy',
      icon: Home,
      content: `
        <div class="italic text-cyan-400 p-3 border-l-2 border-cyan-400 bg-cyan-900 bg-opacity-20 rounded">
          "I believe in building applications that are:<br>
          ✓ Performant under load<br>
          ✓ Maintainable through clean architecture<br>
          ✓ Adaptable to future requirements<br>
          ✓ Delivered with clear communication"
        </div>
        <p class="mt-4">I'm passionate about optimizing Node.js services and crafting intuitive Angular UIs. Let's connect!</p>
      `
    }
  ];


  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      this.animateSections();
    }
  }

  ngAfterViewInit() {
    if (!this.platformService.isBrowser) return;
    gsap.from('[class*="section-card"], .section-card', {
      scrollTrigger: {
        trigger: '#container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
    gsap.utils.toArray('.gsap-fade').forEach((el: any) => {
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



  private animateSections(): void {
    gsap.fromTo(
      '.section-card',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }

  toggleSection(id: string): void {
    this.openSection = this.openSection === id ? null : id;

    if (this.openSection) {
      gsap.fromTo(
        `.section-content-${this.openSection}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }

  setHoveredSection(id: string | null): void {
    this.hoveredSection = id;
  }
}


  // timeline = [
  //   {
  //     title: "Self-Taught Beginning",
  //     date: "2020",
  //     subtitle: "Brototype Institute",
  //     description: "Embraced self-learning methodology, building foundational skills through hands-on projects with weekly industry reviews.",
  //     skills: ["HTML/CSS", "JavaScript", "Git"],
  //     icon: "fas fa-laptop-code"
  //   },
  //   {
  //     title: "First MEAN Stack Project",
  //     date: "2021",
  //     description: "Developed full-stack applications using MongoDB, Express, Angular, and Node.js, receiving rigorous feedback from industry professionals.",
  //     skills: ["Angular", "Node.js", "MongoDB", "Express"],
  //     icon: "fas fa-layer-group"
  //   },
  //   {
  //     title: "Freelance Experience",
  //     date: "2021-2022",
  //     description: "Collaborated on diverse projects, honing client communication skills and delivering customized solutions for various business needs.",
  //     skills: ["REST APIs", "JWT Auth", "AWS Basics"],
  //     icon: "fas fa-user-tie"
  //   },
  //   {
  //     title: "Professional Developer",
  //     date: "2022-Present",
  //     subtitle: "Incubenta, Bengaluru",
  //     description: "Working on multiple production-grade applications, collaborating with cross-functional teams to deliver scalable solutions.",
  //     skills: ["Microservices", "Docker", "CI/CD", "Agile"],
  //     icon: "fas fa-briefcase"
  //   }
  // ];

