import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';
import { SkillsComponent } from './skills/skills.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';
import { CommonModule } from '@angular/common';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, CustomEase, TextPlugin);
@Component({
  selector: 'app-home',
  imports: [CommonModule,HeroComponent, AboutSkillsComponent, SkillsComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('sectionsWrapper') wrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('particlesCanvas') particlesCanvas!: ElementRef<HTMLCanvasElement>;
  
  sectionIds = ['hero', 'about', 'skills', 'contact'];
  currentIndex = 0;
  isAnimating = false;
  particleSystem: any;
  ctx: CanvasRenderingContext2D | null = null;
  
  // 3D perspective variables
  perspectiveValues = {
    rotationY: 0,
    rotationX: 0
  };

  constructor(private route: ActivatedRoute, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initCanvas();
    this.initParticles();
    this.setup3DEffects();
    this.setupScrollSystem();
    this.setupRouteHandling();
    this.createCustomEases();
    
    // Initial animation
    this.animateEntrance();
  }

  private initCanvas() {
    const canvas = this.particlesCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  private initParticles() {
    // Define the particle type
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      shape: 'circle' | 'square';
    }

    // Futuristic particle system
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
        shape: Math.random() > 0.5 ? 'circle' : 'square'
      });
    }
    
    const animateParticles = () => {
      if (!this.ctx) return;
      
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw connection lines first (for depth)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            this.ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.2})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(particles[i].x, particles[i].y);
            this.ctx.lineTo(particles[j].x, particles[j].y);
            this.ctx.stroke();
          }
        }
      }
      
      // Draw particles
      particles.forEach(p => {
        this.ctx!.fillStyle = p.color;
        
        // Update position with some randomness
        p.x += p.speedX + (Math.random() * 0.2 - 0.1);
        p.y += p.speedY + (Math.random() * 0.2 - 0.1);
        
        // Boundary check with wrap-around
        if (p.x > window.innerWidth + 5) p.x = -5;
        if (p.x < -5) p.x = window.innerWidth + 5;
        if (p.y > window.innerHeight + 5) p.y = -5;
        if (p.y < -5) p.y = window.innerHeight + 5;
        
        // Draw different shapes
        if (p.shape === 'circle') {
          this.ctx!.beginPath();
          this.ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx!.fill();
        } else {
          this.ctx!.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        }
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
  }

  private setup3DEffects() {
    // Mouse move 3D perspective effect
    this.renderer.listen('window', 'mousemove', (event: MouseEvent) => {
      if (this.isAnimating) return;
      
      // Calculate rotation based on mouse position
      this.perspectiveValues.rotationY = (event.clientX / window.innerWidth - 0.5) * 10;
      this.perspectiveValues.rotationX = -(event.clientY / window.innerHeight - 0.5) * 10;
      
      gsap.to(this.wrapperRef.nativeElement, {
        rotationY: this.perspectiveValues.rotationY,
        rotationX: this.perspectiveValues.rotationX,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        ease: 'power2.out',
        duration: 1.5
      });
    });
    
    // Reset perspective when not moving
    this.renderer.listen('window', 'mouseleave', () => {
      gsap.to(this.wrapperRef.nativeElement, {
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  private setupScrollSystem() {
    const totalSections = this.sectionIds.length;
    this.wrapperRef.nativeElement.style.height = `${100 * totalSections}vh`;
    
    // Add scroll indicator hologram effect
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'hologram-scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    gsap.to(scrollIndicator, {
      y: () => (this.currentIndex / (totalSections - 1)) * (window.innerHeight - 40),
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  private setupRouteHandling() {
    this.route.fragment.subscribe(fragment => {
      const index = this.sectionIds.indexOf(fragment || 'hero');
      this.gotoSection(index, true);
    });
    
    // Initial section
    this.scrollToSectionById('hero');
  }

  private createCustomEases() {
    // Futuristic easing functions
    CustomEase.create("quantum", "M0,0 C0.1,0.5 0.2,0.9 0.3,1 0.4,1.1 0.6,1.1 0.7,1 0.8,0.9 0.9,0.5 1,0");
    CustomEase.create("hologram", "M0,0 C0.2,0 0.4,1 0.6,1 0.8,1 1,0 1,0");
  }

  private animateEntrance() {
    // Futuristic entrance animation
    gsap.from(this.wrapperRef.nativeElement, {
      opacity: 0,
      y: 100,
      rotationX: 45,
      duration: 1.5,
      ease: 'power3.out',
      onComplete: () => {
        // Start ambient animations
        this.startAmbientAnimations();
      }
    });
    
    // Animate in each section with a stagger
    gsap.from('.section', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  private startAmbientAnimations() {
    // Floating holographic elements
    gsap.to('.hologram-element', {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Pulsing glows
    gsap.to('.glow-element', {
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isAnimating) return;
    event.preventDefault();
    
    // Add velocity-based sensitivity
    const sensitivity = Math.min(Math.abs(event.deltaY) / 10, 3);
    
    if (event.deltaY > 0) {
      this.gotoSection(this.currentIndex + 1);
    } else {
      this.gotoSection(this.currentIndex - 1);
    }
    
    // Add subtle tilt on scroll
    gsap.to(this.wrapperRef.nativeElement, {
      rotationZ: event.deltaY * 0.1 * sensitivity,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isAnimating) return;
    
    switch(event.key) {
      case 'ArrowDown':
        this.gotoSection(this.currentIndex + 1);
        break;
      case 'ArrowUp':
        this.gotoSection(this.currentIndex - 1);
        break;
      case 'Home':
        this.gotoSection(0);
        break;
      case 'End':
        this.gotoSection(this.sectionIds.length - 1);
        break;
    }
  }

  gotoSection(index: number, fromRoute = false) {
    if (index < 0 || index >= this.sectionIds.length || this.isAnimating) return;
    
    this.isAnimating = true;
    const target = index * -100; // yPercent value
    
    // Create a futuristic timeline with multiple effects
    const tl = gsap.timeline({
      onComplete: () => {
        this.currentIndex = index;
        this.isAnimating = false;
        history.replaceState(null, '', `#${this.sectionIds[this.currentIndex]}`);
        
        // Trigger section-specific animations
        this.animateSectionEntrance(index);
      }
    });
    
    // Main scroll animation
    tl.to(this.wrapperRef.nativeElement, {
      yPercent: target,
      duration: 1.2,
      ease: 'quantum'
    }, 0);
    
    // Add holographic distortion effect
    tl.to(this.wrapperRef.nativeElement, {
      filter: 'blur(5px)',
      duration: 0.2,
      ease: 'power1.in'
    }, 0);
    
    tl.to(this.wrapperRef.nativeElement, {
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    }, 0.4);
    
    // Add particle burst effect
    if (!fromRoute) {
      tl.fromTo('.particle-burst', 
        { scale: 0, opacity: 1 },
        { scale: 2, opacity: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
        0
      );
    }
    
    // Add chromatic aberration effect
    tl.to(this.wrapperRef.nativeElement, {
      '--chromatic-offset': '10px',
      duration: 0.3,
      ease: 'power2.in'
    }, 0);
    
    tl.to(this.wrapperRef.nativeElement, {
      '--chromatic-offset': '0px',
      duration: 0.9,
      ease: 'elastic.out(1, 0.5)'
    }, 0.3);
  }

  private animateSectionEntrance(index: number) {
    const sectionId = this.sectionIds[index];
    const sectionElement = document.getElementById(sectionId);
    
    if (!sectionElement) return;
    
    // Futuristic section entrance animation
    gsap.from(sectionElement.querySelectorAll('*'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.2
    });
    
    // Section-specific animations
    switch(sectionId) {
      case 'hero':
        this.animateHeroSection();
        break;
      case 'about':
        this.animateAboutSection();
        break;
      case 'skills':
        this.animateSkillsSection();
        break;
      case 'contact':
        this.animateContactSection();
        break;
    }
  }

  private animateHeroSection() {
    // Futuristic hero animations
    gsap.to('.hero-title', {
      text: 'YOUR_NAME',
      duration: 1,
      ease: 'none',
      delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out',
      delay: 1
    });
    
    // Floating tech elements
    gsap.to('.tech-orb', {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });
  }

  private animateAboutSection() {
    // Holographic timeline animation
    gsap.from('.timeline-item', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
    
    // Floating avatar effect
    gsap.to('.profile-avatar', {
      y: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  private animateSkillsSection() {
    // Radar chart animation
    gsap.from('.skill-radar', {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });
    
    // Skill bars loading
    gsap.to('.skill-bar-fill', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1
    });
  }

  private animateContactSection() {
    // Interactive contact form elements
    gsap.from('.contact-input', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });
    
    // Pulsing submit button
    gsap.to('.submit-btn', {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Called from sidebar or header nav
  scrollToSectionById(id: string) {
    const index = this.sectionIds.indexOf(id);
    if (index !== -1) this.gotoSection(index);
  }

  //  @ViewChild('sectionsWrapper') wrapperRef!: ElementRef<HTMLDivElement>;

  // sectionIds = ['hero', 'about', 'skills'];
  // currentIndex = 0;
  // isAnimating = false;

  // constructor(private route: ActivatedRoute) {}

  // ngAfterViewInit() {
  //   // Set wrapper height dynamically
  //   const totalSections = this.sectionIds.length;
  //   this.wrapperRef.nativeElement.style.height = `${100 * totalSections}vh`;

  //   // Handle route fragment navigation
  //   this.route.fragment.subscribe(fragment => {
  //     const index = this.sectionIds.indexOf(fragment || 'hero');
  //     this.gotoSection(index);
  //   });

  //   // Ensure default section on load
  //   this.scrollToSectionById('hero');
  // }

  // @HostListener('window:wheel', ['$event'])
  // onScroll(event: WheelEvent) {
  //   if (this.isAnimating) return;

  //   if (event.deltaY > 0) {
  //     this.gotoSection(this.currentIndex + 1);
  //   } else {
  //     this.gotoSection(this.currentIndex - 1);
  //   }
  // }

  // gotoSection(index: number) {
  //   if (index < 0 || index >= this.sectionIds.length) return;

  //   this.isAnimating = true;

  //   const target = index * -100; // yPercent value

  //   gsap.to(this.wrapperRef.nativeElement, {
  //     yPercent: target,
  //     duration: 1,
  //     ease: 'power2.inOut',
  //     onComplete: () => {
  //       this.currentIndex = index;
  //       this.isAnimating = false;
  //       history.replaceState(null, '', `#${this.sectionIds[this.currentIndex]}`);
  //     },
  //   });
  // }

  // // Called from sidebar or header nav
  // scrollToSectionById(id: string) {
  //   const index = this.sectionIds.indexOf(id);
  //   if (index !== -1) this.gotoSection(index);
  // }
}
