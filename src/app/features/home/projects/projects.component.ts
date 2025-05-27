import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {

  constructor(private platformService: PlatformService) { }
  projects = [
    {
      title: 'Real-time Chat App',
      description: 'A secure, socket-based real-time chat app with authentication.',
      tech: ['Angular', 'Node.js', 'Socket.io'],
      image: 'assets/projects/chat-app.png',
      github: 'https://github.com/your/chat-app',
      live: 'https://your-chat-app.vercel.app'
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured store with cart, Stripe payments, and admin dashboard.',
      tech: ['Angular', 'Node.js', 'MongoDB', 'Tailwind'],
      image: 'assets/projects/ecommerce.png',
      github: 'https://github.com/your/ecommerce',
      live: 'https://your-store.vercel.app'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio with animations and 3D transitions.',
      tech: ['Angular', 'GSAP', 'Three.js'],
      image: 'assets/projects/portfolio.png',
      github: 'https://github.com/your/portfolio',
      live: 'https://yourportfolio.com'
    }
  ];

  ngOnInit() {
    if (this.platformService.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
      });
    }
  }


}
