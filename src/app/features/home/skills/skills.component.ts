import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {

 skillsGroups = [
  {
    title: 'Core Stack',
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


  constructor(private platformService: PlatformService ) {
  }

  ngOnInit() {
    if (this.platformService.isBrowser) {
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
}
