import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { Briefcase, Code2, Home, LucideAngularModule, User } from 'lucide-angular';
import { ThreeBackgroundAboutComponent } from '../../../shared/animations/three-background-about/three-background-about.component';
import { GsapAnimationService } from '../../../shared/animations/service/gsap-animation.service';

@Component({
  selector: 'app-about-skills',
  imports: [CommonModule, LucideAngularModule, ThreeBackgroundAboutComponent],
  templateUrl: './about-skills.component.html',
  styleUrl: './about-skills.component.css'
})

export class AboutSkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChildren('fade') fadeEls!: QueryList<ElementRef>;
  @ViewChild('sectionContainer') sectionContainer!: ElementRef;

  constructor(private platformService: PlatformService, private animationService: GsapAnimationService,) { }
  openSection: string | null = null;
  hoveredSection: string | null = null;

  sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: User,
      content: `
      I architect and develop powerful web applications using the MEAN stack (MongoDB, Express.js, Angular, and Node.js), blending clean architecture with real-world performance. As a self-taught developer turned professional, I bring a unique mindset shaped by curiosity, grit, and a relentless drive to solve problems at scale. Whether it’s building scalable solutions, leading with ownership, or adapting fast in tech-driven environments—I deliver with intent and impact.`
    },
    {
      id: 'journey',
      title: 'Professional Journey',
      icon: Briefcase,
      content: `
        <strong>Brototype Institute (2021–2022)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Completed an intensive, mentor-driven self-learning program</li>
          <li>Built 15+ full-stack projects using the MEAN stack</li>
          <li>Developed strong debugging skills and an independent problem-solving mindset</li>
        </ul>

        <strong class="block mt-4">Freelance Developer (2023–2024)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Delivered 8+ full-cycle client projects, including e-commerce and portfolio platforms</li>
          <li>Specialized in JWT-auth, RESTful APIs, mobile responsiveness, and deployment workflows</li>
          <li>Managed client communication, deadlines, and post-deployment support independently</li>
        </ul>

        <strong class="block mt-4">Incubenation, Bengaluru (2025–Present)</strong>
        <ul class="list-disc pl-5 mt-2">
          <li>Maintaining and scaling 6+ production-grade apps serving 10,000+ users</li>
          <li>Lead optimizations of backend APIs and manage DNS, CI/CD pipelines</li>
          <li>Work with Angular 16–19, Node.js 18+, MongoDB Atlas, and AWS services</li>
          <li>Collaborated with cross-language developers (e.g., Python) to enforce coding best practices, improving maintainability across frontend and backend codebases.</li>
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
  <li>Proficient in MEAN Stack (MongoDB, Express, Angular, Node.js)</li>
  <li>Strong in TypeScript, RxJS, modular architecture, and scalable design</li>
  <li>Experienced with Docker, CI/CD pipelines, and advanced AWS deployments</li>
  <li>Socket.io integration for real-time communication (chat, notifications)</li>
</ul>

<strong class="block mt-4">Full-Stack Innovation</strong>
<ul class="list-disc pl-5 mt-2">
  <li>Custom animations with GSAP and Angular Animations for engaging UX</li>
  <li>Tailored alert systems and UI feedback using modern libraries & design</li>
  <li>Deep integration experience: WhatsApp API, Nodemailer, and third-party services</li>
</ul>

<strong class="block mt-4">Unique Mindset</strong>
<ul class="list-disc pl-5 mt-2">
  <li>Self-taught with strong problem-solving and rapid learning abilities</li>
  <li>Team-first mindset with a focus on clean, maintainable code</li>
  <li>Combines technical depth with creative UI/UX thinking</li>
</ul>

      `
    },
    {
      id: 'philosophy',
      title: 'Philosophy',
      icon: Home,
      content: `
        <div class="italic text-cyan-400 p-4 border-l-4 border-cyan-500 bg-cyan-900/20 rounded-md shadow-inner">
  “I believe in building applications that are:<br>
  <span class="ml-2">✔️ Performant under real-world load</span><br>
  <span class="ml-2">✔️ Maintainable with clean, scalable architecture</span><br>
  <span class="ml-2">✔️ Future-proof through thoughtful design</span><br>
  <span class="ml-2">✔️ Communicated with clarity and confidence</span>
</div>
<p class="mt-5 text-gray-200 leading-relaxed">
  I'm passionate about <strong class="text-cyan-400">optimizing Node.js backends</strong> and
  crafting <strong class="text-cyan-400">intuitive Angular UIs</strong> with animations and modern UX.<br>
  Whether it’s real-time chat, smart integrations, or scalable cloud deployments — I bring it all together.<br>
  <span class="block mt-3">Let’s create something impactful!</span>
</p>

      `
    }
  ];

  ngOnInit(): void {
    // if (this.platformService.isBrowser) {
    //   gsap.registerPlugin(ScrollTrigger);
    // }
  }

  ngAfterViewInit(): void {
    if (!this.platformService.isBrowser) return;
    this.animationService.fadeInOnScroll('.gsap-fade');
    this.initAnimations();
  }
  private initAnimations() {
    Promise.resolve().then(() => {
      this.animationService.staggerFadeInOnScroll(
        '.section-card-item',
        {
          y: 30,
          duration: 0.8,
          stagger: 0.15
        }
      );
    });
  }

  toggleSection(id: string): void {
    const isOpening = this.openSection !== id;

    if (this.openSection) {
      this.animationService.animateToggleContentOut(`.section-content-${this.openSection}`);
    }

    this.openSection = isOpening ? id : null;

    if (isOpening) {
      // Wait briefly for Angular to apply [class.hidden]
      setTimeout(() => {
        this.animationService.animateToggleContent(`.section-content-${id}`);
      }, 50);
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

