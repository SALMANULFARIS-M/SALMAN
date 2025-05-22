import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeBackgroundSkillsComponent } from '../../../shared/animations/three-background-skills/three-background-skills.component';
import { GsapAnimationService } from '../../../shared/animations/service/gsap-animation.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule, ThreeBackgroundSkillsComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent implements OnInit {

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLDivElement>;

  hoveredSkill: string | null = null;
  activeGroup = 0;
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


  constructor(private platformService: PlatformService, private animationService: GsapAnimationService) { }

  ngOnInit() {
    if (this.platformService.isBrowser) {
      this.animationService.animateCards();
      this.animationService.animateSkillBars(this.skillsGroups);
    }
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


