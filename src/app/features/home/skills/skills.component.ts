import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent implements OnInit {

  @ViewChild('particlesCanvas', { static: true }) particlesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLDivElement>;

  hoveredSkill: string | null = null;
  activeGroup = 0;
  private animationFrameId!: number;
  public Math = Math;


  skillsGroups = [
    {
      title: 'Core Stack',
      icon: 'Layers',
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: 'MongoDB', icon: 'Database', level: 85 },
        { name: 'Express.js', icon: 'Server', level: 80 },
        { name: 'Angular', icon: 'Code', level: 90 },
        { name: 'Node.js', icon: 'Cpu', level: 88 },
        { name: 'TypeScript', icon: 'FileCode', level: 92 },
        { name: 'JavaScript', icon: 'Zap', level: 95 },
        { name: 'Tailwind CSS', icon: 'Palette', level: 90 },
        { name: 'Bootstrap', icon: 'Layout', level: 80 },
        { name: 'CSS3', icon: 'Brush', level: 85 },
      ]
    },
    {
      title: 'DevOps & Deployment',
      icon: 'ServerCog',
      color: "from-purple-400 to-pink-500",
      skills: [
        { name: 'Vercel', icon: 'Cloud', level: 85 },
        { name: 'Render', icon: 'CloudLightning', level: 80 },
        { name: 'AWS', icon: 'CloudCog', level: 75 },
        { name: 'DigitalOcean', icon: 'CloudSun', level: 70 },
        { name: 'Docker', icon: 'Box', level: 60 },
        { name: 'Nginx', icon: 'ServerCog', level: 65 },
        { name: 'Git', icon: 'GitBranch', level: 90 },
        { name: 'GitHub', icon: 'Github', level: 90 },
        { name: 'DNS Management', icon: 'Globe', level: 80 }
      ]
    },
    {
      title: 'Other Tools & Enhancements',
      icon: 'Puzzle',
      color: "from-green-400 to-emerald-500",
      skills: [
        { name: 'Socket.IO', icon: 'PlugZap', level: 70 },
        { name: 'Nodemailer', icon: 'Send', level: 85 },
        { name: 'WhatsApp API', icon: 'MessageCircleMore', level: 75 },
        { name: 'GSAP', icon: 'Move3D', level: 90 },
        { name: 'Tsparticles', icon: 'Sparkles', level: 75 },
        { name: 'Three.js', icon: 'SquareStack', level: 60 },
        { name: 'Angular Animations', icon: 'Film', level: 85 },
        { name: 'Angular SSR', icon: 'ServerCrash', level: 80 },
        { name: 'React (Basics)', icon: 'Atom', level: 60 },
        { name: 'Next.js (Basics)', icon: 'ArrowBigRight', level: 50 },
        { name: 'NestJS (Basics)', icon: 'ShieldCheck', level: 50 },
      ]
    }
  ];


  constructor(private platformService: PlatformService) {
  }

  ngOnInit() {
    if (this.platformService.isBrowser) {
      this.createParticles();
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.skill-card', {
        scrollTrigger: '.skill-card',
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });

      // Animate bars when they enter viewport
      this.skillsGroups.forEach((group, groupIdx) => {
        group.skills.forEach((skill, skillIdx) => {
          gsap.fromTo(
            `.skill-bar-${groupIdx}-${skillIdx}`,
            { width: '0%' },
            {
              width: `${skill.level}%`,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: `.skill-bar-${groupIdx}-${skillIdx}`,
                start: 'top 80%',
              },
            }
          );
        });
      });
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleResize);
  }

  private createParticles() {
    const canvas = this.particlesCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize() {
    const canvas = this.particlesCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  setHoveredSkill(skill: string | null) {
    this.hoveredSkill = skill;
  }

  setActiveGroup(index: number) {
    this.activeGroup = index;
  }

  isSkillHovered(groupIndex: number, skillIndex: number): boolean {
    return this.hoveredSkill === `${groupIndex}-${skillIndex}`;
  }

  getActiveGroup() {
    return this.skillsGroups[this.activeGroup];
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}
