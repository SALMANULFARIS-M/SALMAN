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

  filter = 'all';

   projects = [
    {
      title: 'StudyInBengaluru',
      type: 'live',
      description: 'Angular SSR frontend and Node.js backend with MongoDB for StudyInBengaluru.',
      live: 'https://studyinbengaluru.vercel.app',
      github: 'https://github.com/yourusername/studyinbengaluru-angular-ssr',
      image: 'assets/images/studyinbengaluru.png',
      tech: ['Angular SSR', 'Node.js', 'MongoDB']
    },
    {
      title: 'KTM Demo Website',
      type: 'learning',
      description: 'Responsive layout practice using CSS Grid and Flexbox.',
      live: 'https://your-ktm-demo.vercel.app',
      github: 'https://github.com/yourusername/ktm-demo',
      image: 'assets/images/ktm-demo.png',
      tech: ['HTML', 'CSS Grid', 'Flexbox']
    },
    {
      title: 'Talent4Startup Backend',
      type: 'backend',
      description: 'Node.js and Express backend for Talent4Startup platform.',
      github: 'https://github.com/yourusername/talent4startup-backend',
      tech: ['Node.js', 'Express', 'MongoDB']
    },
    {
      title: 'CEO Square',
      type: 'live',
      description: 'Angular SSR project for CEO Square company.',
      live: 'https://ceosquare.vercel.app',
      github: 'https://github.com/yourusername/ceosquare-angular-ssr',
      tech: ['Angular SSR']
    },
    {
      title: 'Career Cafe Angular SSR',
      type: 'live',
      description: 'Angular SSR project for Career Cafe.',
      live: 'https://careercafe.vercel.app',
      github: 'https://github.com/yourusername/careercafe-angular-ssr',
      tech: ['Angular SSR']
    },
    {
      title: 'Bestract',
      type: 'live',
      description: 'Angular SSR project for Bestract company.',
      live: 'https://bestract.vercel.app',
      github: 'https://github.com/yourusername/bestrac-backend',
      tech: ['Angular SSR']
    },
    {
      title: 'Flyrad Backend',
      type: 'backend',
      description: 'Backend project for Flyrad company.',
      github: 'https://github.com/yourusername/flyrad-backend',
      tech: ['Node.js', 'Express']
    },
    {
      title: 'Old Personal Website',
      type: 'personal',
      description: 'My old personal website built with HTML, CSS, and Bootstrap.',
      live: 'https://your-old-personal-site.vercel.app',
      github: 'https://github.com/yourusername/old-personal-website',
      tech: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      title: 'New Personal Website',
      type: 'personal',
      description: 'New personal website built with Angular SSR and advanced animations with futuristic style.',
      live: 'https://your-new-personal-site.vercel.app',
      github: 'https://github.com/yourusername/new-personal-website',
      tech: ['Angular SSR', 'Tailwind', 'GSAP']
    },
    {
      title: 'Apple Demo Website',
      type: 'learning',
      description: 'Apple website clone using HTML, CSS, and Bootstrap.',
      live: 'https://apple-demo.vercel.app',
      github: 'https://github.com/yourusername/apple-demo',
      tech: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      title: 'SpaceX Demo',
      type: 'learning',
      description: 'A demo project to learn HTML and CSS with SpaceX-themed UI.',
      live: 'https://spacex-demo.vercel.app',
      github: 'https://github.com/yourusername/spacex-demo',
      tech: ['HTML', 'CSS']
    },
    {
      title: 'User Management System',
      type: 'backend',
      description: 'User management system built with Node.js, MongoDB, and EJS templating.',
      github: 'https://github.com/yourusername/user-management-node',
      tech: ['Node.js', 'MongoDB', 'EJS']
    },
    {
      title: 'Football Ecommerce Platform',
      type: 'fullstack',
      description: 'Ecommerce platform for football items using Node.js, MongoDB, Express, and Handlebars/EJS.',
      live: 'https://your-football-ecommerce.vercel.app',
      github: 'https://github.com/yourusername/football-ecommerce',
      tech: ['Node.js', 'Express', 'MongoDB', 'EJS']
    },
    {
      title: 'Course Selling Platform',
      type: 'fullstack',
      description: 'Fullstack course selling platform with Angular, Node.js, Express, MongoDB, and Socket.io live chat.',
      live: 'https://your-course-platform.vercel.app',
      github: 'https://github.com/yourusername/course-selling-platform',
      tech: ['Angular', 'Node.js', 'Socket.io', 'MongoDB']
    },
    {
      title: 'Netflix UI Clone',
      type: 'frontend',
      description: 'Netflix UI clone built with Angular.',
      github: 'https://github.com/yourusername/netflix-ui-angular',
      tech: ['Angular']
    },
    {
      title: 'Mini User Management',
      type: 'mean-stack',
      description: 'Mini user management project using MEAN stack.',
      github: 'https://github.com/yourusername/mini-user-management',
      tech: ['MongoDB', 'Express', 'Angular', 'Node.js']
    },
    {
      title: 'Random Password Generator',
      type: 'mini',
      description: 'Random password generator built using Angular only.',
      github: 'https://github.com/yourusername/angular-password-generator',
      tech: ['Angular']
    },
    {
      title: 'Angular To-Do List',
      type: 'mini',
      description: 'Simple to-do list application built with Angular.',
      github: 'https://github.com/yourusername/angular-todo-list',
      tech: ['Angular']
    },
    {
      title: 'Data Structures in JavaScript',
      type: 'learning',
      description: 'Practice projects implementing data structures using JavaScript basics.',
      github: 'https://github.com/yourusername/js-data-structures',
      tech: ['JavaScript']
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
