import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

import { ThreeBackgroundSkillsComponent } from '../../../shared/animations/three-background-skills/three-background-skills.component';
import { GsapAnimationService } from '../../../shared/animations/service/gsap-animation.service';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillGroup {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule, ThreeBackgroundSkillsComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent implements OnInit {

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('skillBar', { read: ElementRef }) skillBars!: QueryList<ElementRef>;
  @ViewChildren('skillValue') skillValues!: QueryList<ElementRef>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  hasAnimated = false;
  hoveredSkill: { groupIndex: number; skillIndex: number } | null = null;
  activeGroup = 0;
  scrollPercent = 0;
  public Math = Math;
  readonly gridArray = Array.from({ length: 400 }, (_, i) => i);
  readonly dotsArray = Array.from({ length: 5 }, (_, i) => i);

  skillsGroups: SkillGroup[] = [
    {
      title: 'Core Stack',
      icon: 'Layers',
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: 'Angular', icon: 'Code', level: 90 },
        { name: 'Node.js', icon: 'Cpu', level: 92 },
        { name: 'MongoDB', icon: 'Database', level: 90 },
        { name: 'Express.js', icon: 'Server', level: 88 },
        { name: 'JavaScript', icon: 'Zap', level: 95 },
        { name: 'HTML5', icon: 'Code2', level: 90 },
        { name: 'TypeScript', icon: 'FileCode', level: 92 },
        { name: 'Tailwind CSS', icon: 'Palette', level: 90 },
        { name: 'Bootstrap', icon: 'Layout', level: 95 },
        { name: 'CSS3', icon: 'Brush', level: 90 },
      ]
    },
    {
      title: 'DevOps & Deployment',
      icon: 'GitMerge',
      color: "from-purple-400 to-pink-500",
      skills: [
        { name: 'Git', icon: 'GitBranch', level: 95 },
        { name: 'GitHub', icon: 'Github', level: 95 },
        { name: 'Vercel', icon: 'Cloud', level: 90 },
        { name: 'Render', icon: 'CloudLightning', level: 88 },
        { name: 'AWS', icon: 'CloudCog', level: 75 },
        { name: 'DigitalOcean', icon: 'CloudSun', level: 70 },
        { name: 'Docker', icon: 'Box', level: 60 },
        { name: 'Nginx', icon: 'ServerCog', level: 80 },
        { name: 'CI/CD', icon: 'ServerCrash', level: 70 },
        { name: 'DNS Management', icon: 'Globe', level: 80 }
      ]
    },
    {
      title: 'Other Tools & Enhancements',
      icon: 'Wrench',
      color: "from-green-400 to-emerald-500",
      skills: [
        { name: 'Angular Animations', icon: 'Film', level: 95 },
        { name: 'Angular SSR', icon: 'ServerCrash', level: 95 },
        { name: 'Socket.IO', icon: 'PlugZap', level: 90 },
        { name: 'Nodemailer', icon: 'Send', level: 85 },
        { name: 'WhatsApp API', icon: 'MessageCircleMore', level: 75 },
        { name: 'GSAP', icon: 'Move3D', level: 90 },
        { name: 'Tsparticles', icon: 'Sparkles', level: 80 },
        { name: 'Three.js', icon: 'SquareStack', level: 90 },
        { name: 'React (Basics)', icon: 'Atom', level: 60 },
        { name: 'Next.js (Basics)', icon: 'ArrowBigRight', level: 50 },
        { name: 'NestJS (Basics)', icon: 'ShieldCheck', level: 50 },
        { name: 'Sql', icon: 'Database', level: 70 },
        { name: 'Figma', icon: 'PenTool', level: 60 },
        { name: 'Postman', icon: 'Network', level: 80 },

      ]
    }
  ];


  trackByIndex(index: number): number {
    return index;
  }

  constructor(private cdr: ChangeDetectorRef, private platformService: PlatformService, private animationService: GsapAnimationService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.animationService.fadeInOnScroll('.head');
      this.observeSkillsSection();
      this.onScroll();
    }
  }

  onScroll(): void {
  const el = this.scrollContainer.nativeElement;
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  this.scrollPercent = Math.min(100, (scrollTop / scrollHeight) * 100);
}

  observeSkillsSection() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateSkillBars();
        }
      },
      { threshold: 0.3 }
    );
    if (this.sectionRef?.nativeElement) {
      observer.observe(this.sectionRef.nativeElement);
    }
  }

  animateSkillBars() {
    const group = this.getActiveGroup();
    const elements = this.skillBars.map(b => b.nativeElement);
    this.animationService.killAnimations(elements);

    this.skillBars.forEach((barRef, i) => {
      const level = group.skills[i]?.level ?? 0;
      this.animationService.animateSkillBar(barRef.nativeElement, level);

      const span = this.skillValues.get(i)?.nativeElement;
      if (span) {
        this.animationService.animateSkillValue(span, level);
      }
    });
  }

  setActiveGroup(index: number) {
    this.activeGroup = index;
    this.cdr.detectChanges();
    setTimeout(() => this.animateSkillBars());
  }

  setHoveredSkill(groupIndex: number, skillIndex: number) {
    this.hoveredSkill = { groupIndex, skillIndex };
  }

  isSkillHovered(groupIndex: number, skillIndex: number): boolean {
    return this.hoveredSkill?.groupIndex === groupIndex && this.hoveredSkill?.skillIndex === skillIndex;
  }

  getActiveGroup() {
    return this.skillsGroups[this.activeGroup];
  }
  

}


