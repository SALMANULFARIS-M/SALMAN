import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { ThreeBackgroundProjectsComponent } from '../../../shared/animations/three-background-projects/three-background-projects.component';

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  category: 'production' | 'learning';
  description: string;
  live?: string;
  github?: string;
  image?: string;
  tech: string[];
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule,ThreeBackgroundProjectsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChildren('projectCard', { read: ElementRef }) projectCards!: QueryList<ElementRef>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  scrollPercent: number = 0;
  activeCategory: 'production' | 'learning' = 'production';
  activeSubFilter: string = 'frontend';
  Math = Math;
  readonly categories: ('production' | 'learning')[] = ['production', 'learning'];

  projects: Project[] = [
    {
      id: '1',
      title: 'StudyInBengaluru',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Angular SSR frontend for StudyInBengaluru educational platform with modern UI/UX design.',
      live: 'https://studyinbengaluru.vercel.app',
      github: 'https://github.com/yourusername/studyinbengaluru-angular-ssr',
      image: 'assets/images/studyinbengaluru.png',
      tech: ['Angular SSR', 'TypeScript', 'Tailwind CSS', 'RxJS']
    },
    {
      id: '2',
      title: 'StudyInBengaluru API',
      type: 'Backend',
      status: 'Live',
      category: 'production',
      description: 'Robust Node.js backend with MongoDB for StudyInBengaluru platform, handling user management and course data.',
      live: 'https://studyinbengaluru.render.com',
      github: 'https://github.com/yourusername/studyinbengaluru-node-backend',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose']
    },
    {
      id: '3',
      title: 'Career Cafe',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Modern career guidance platform built with Angular SSR, featuring interactive career assessments.',
      live: 'https://careercafe.vercel.app',
      github: 'https://github.com/yourusername/careercafe-angular-ssr',
      image: 'assets/images/careercafe.png',
      tech: ['Angular SSR', 'TypeScript', 'SCSS', 'Chart.js']
    },
    {
      id: '4',
      title: 'Career Cafe API',
      type: 'Backend',
      status: 'Live',
      category: 'production',
      description: 'Scalable backend service for Career Cafe platform with advanced analytics and reporting.',
      live: 'https://careercafe-backend.render.com',
      github: 'https://github.com/yourusername/careercafe-node-backend',
      tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Bull Queue']
    },
    {
      id: '5',
      title: 'CEO Square',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Premium corporate website for CEO Square with stunning animations and smooth user experience.',
      live: 'https://ceosquare.vercel.app',
      github: 'https://github.com/yourusername/ceosquare-angular-ssr',
      image: 'assets/images/ceosquare.png',
      tech: ['Angular SSR', 'GSAP', 'Three.js', 'Tailwind CSS']
    },
    {
      id: '6',
      title: 'CEO Square API',
      type: 'Backend',
      status: 'Live',
      category: 'production',
      description: 'High-performance backend services for CEO Square website with CMS integration.',
      live: 'https://ceosquare-backend.render.com',
      github: 'https://github.com/yourusername/ceosquare-node-backend',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Prisma']
    },
    {
      id: '7',
      title: 'Bestract',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Innovative company website for Bestract with 3D elements and interactive portfolio showcase.',
      live: 'https://bestract.vercel.app',
      github: 'https://github.com/yourusername/bestract-angular',
      image: 'assets/images/bestract.png',
      tech: ['Angular SSR', 'Three.js', 'GSAP', 'WebGL']
    },
    {
      id: '8',
      title: 'Talent4Startup API',
      type: 'Backend',
      status: 'Live',
      category: 'production',
      description: 'Comprehensive Node.js backend for Talent4Startup platform with advanced matching algorithms.',
      github: 'https://github.com/yourusername/talent4startup-backend',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io']
    },
    {
      id: '9',
      title: 'Personal Portfolio',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Modern personal website showcasing projects with advanced animations and smooth transitions.',
      live: 'https://yourportfolio.vercel.app',
      github: 'https://github.com/yourusername/personal-portfolio',
      image: 'assets/images/portfolio.png',
      tech: ['Angular SSR', 'Tailwind CSS', 'GSAP', 'Framer Motion']
    },
    {
      id: '10',
      title: 'Elclassico Store',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Premium football e-commerce platform with integrated payment system and inventory management.',
      live: 'https://elclassico.vercel.app',
      github: 'https://github.com/yourusername/elclassico-frontend',
      image: 'assets/images/elclassico.png',
      tech: ['Angular', 'Stripe', 'NgRx', 'Angular Material']
    },
    {
      id: '11',
      title: 'Tutoriax Platform',
      type: 'Frontend',
      status: 'Live',
      category: 'production',
      description: 'Advanced online learning platform with real-time chat, video conferencing, and progress tracking.',
      live: 'https://tutoriax.vercel.app',
      github: 'https://github.com/yourusername/tutoriax-frontend',
      image: 'assets/images/tutoriax.png',
      tech: ['Angular', 'Socket.io', 'WebRTC', 'RxJS', 'PrimeNG']
    },
    {
      id: '12',
      title: 'Tutoriax API',
      type: 'Backend',
      status: 'Live',
      category: 'production',
      description: 'Scalable backend for online learning platform with real-time features and video streaming.',
      live: 'https://tutoriax-backend.render.com',
      github: 'https://github.com/yourusername/tutoriax-backend',
      tech: ['Node.js', 'Socket.io', 'MongoDB', 'FFmpeg', 'AWS S3']
    },

    // Learning Projects
    {
      id: '13',
      title: 'Netflix UI Clone',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Pixel-perfect Netflix interface clone with movie browsing, search, and video player functionality.',
      live: 'https://netflix-clone-angular.vercel.app',
      github: 'https://github.com/yourusername/netflix-ui-angular',
      image: 'assets/images/netflix-clone.png',
      tech: ['Angular', 'TMDB API', 'RxJS', 'Angular CDK']
    },
    {
      id: '14',
      title: 'First Portfolio',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      image: 'assets/images/portfolio.png',
      description: 'My first personal website built during learning phase, showcasing basic web development skills.',
      live: 'https://old-portfolio.vercel.app',
      github: 'https://github.com/yourusername/old-portfolio',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'jQuery']
    },
    {
      id: '15',
      title: 'KTM Showcase',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Responsive motorcycle showcase website demonstrating modern CSS Grid and Flexbox techniques.',
      image: 'assets/images/portfolio.png',
      live: 'https://ktm-demo.vercel.app',
      github: 'https://github.com/yourusername/ktm-demo',
      tech: ['HTML5', 'CSS Grid', 'Flexbox', 'Vanilla JS']
    },
    {
      id: '16',
      title: 'Apple Clone',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Apple website recreation focusing on responsive design principles and smooth animations.',
      live: 'https://apple-demo.vercel.app',
      github: 'https://github.com/yourusername/apple-demo',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'AOS Library']
    },
    {
      id: '17',
      title: 'SpaceX Landing',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Space-themed landing page with parallax effects and interactive elements.',
      live: 'https://spacex-demo.vercel.app',
      github: 'https://github.com/yourusername/spacex-demo',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'GSAP']
    },
    {
      id: '18',
      title: 'User Management System',
      type: 'Other',
      status: 'Completed',
      category: 'learning',
      description: 'Full-stack user management application with CRUD operations and authentication.',
      github: 'https://github.com/yourusername/user-management-node',
      tech: ['Node.js', 'MongoDB', 'EJS', 'Passport.js']
    },
    {
      id: '19',
      title: 'MEAN Stack App',
      type: 'Other',
      status: 'Completed',
      category: 'learning',
      description: 'Complete user management system built with MEAN stack architecture.',
      github: 'https://github.com/yourusername/mean-user-system',
      tech: ['MongoDB', 'Express', 'Angular', 'Node.js']
    },
    {
      id: '20',
      title: 'Password Generator',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Secure password generator with customizable options and strength indicators.',
      github: 'https://github.com/yourusername/angular-password-generator',
      tech: ['Angular', 'TypeScript', 'Crypto API']
    },
    {
      id: '21',
      title: 'Todo Application',
      type: 'Frontend',
      status: 'Completed',
      category: 'learning',
      description: 'Feature-rich todo application with drag-and-drop, categories, and local storage.',
      live: 'https://angular-todo-app.vercel.app',
      github: 'https://github.com/yourusername/angular-todo-list',
      tech: ['Angular', 'NgRx', 'Angular CDK', 'Local Storage']
    },
    {
      id: '22',
      title: 'Data Structures Library',
      type: 'Other',
      status: 'Completed',
      category: 'learning',
      description: 'Comprehensive implementation of data structures and algorithms in JavaScript with tests.',
      github: 'https://github.com/yourusername/js-data-structures',
      tech: ['JavaScript', 'Jest', 'TypeScript', 'Algorithms']
    }
  ];
  constructor(private platformService: PlatformService) { }
  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      this.animateHeader();
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateProjectCards();
      this.onScroll();
    }, 100);
const el = this.scrollContainer.nativeElement;

  el.addEventListener('wheel', (e: WheelEvent) => {
    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
      e.preventDefault(); // prevent being trapped
      window.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    }
  }, { passive: false });
  }

  onScroll(): void {
  const el = this.scrollContainer.nativeElement;
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  this.scrollPercent = Math.min(100, (scrollTop / scrollHeight) * 100);
}

  get filteredProjects(): Project[] {
    return this.projects.filter(project => {
      const matchesCategory = project.category === this.activeCategory;
      const type = project.type?.toLowerCase() || '';

      let matchesSubFilter = false;
      if (this.activeSubFilter === 'frontend') {
        matchesSubFilter = type === 'frontend';
      } else if (this.activeSubFilter === 'backend') {
        matchesSubFilter = type === 'backend';
      } else if (this.activeSubFilter === 'other') {
        matchesSubFilter = type !== 'frontend' && type !== 'backend';
      }

      return matchesCategory && matchesSubFilter;
    });
  }

  setCategory(category: 'production' | 'learning'): void {
    this.activeCategory = category;
    this.activeSubFilter = 'frontend';
    setTimeout(() => this.animateProjectCards(), 100);
  }

  setSubFilter(subFilter: string): void {
    this.activeSubFilter = subFilter;
    setTimeout(() => this.animateProjectCards(), 100);
  }

  getBadgeClass(project: Project): string {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';

    if (project.category === 'production') {
      if (project.type.toLowerCase() === 'frontend') {
        return `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500/30`;
      } else if (project.type.toLowerCase() === 'backend') {
        return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
      } else {
        return `${baseClasses} bg-purple-500/20 text-purple-300 border border-purple-500/30`;
      }
    } else {
      if (project.type.toLowerCase() === 'frontend') {
        return `${baseClasses} bg-cyan-500/20 text-cyan-300 border border-cyan-500/30`;
      } else {
        return `${baseClasses} bg-orange-500/20 text-orange-300 border border-orange-500/30`;
      }
    }
  }

  getStatusClass(status: string): string {
    const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';

    switch (status.toLowerCase()) {
      case 'live':
        return `${baseClasses} bg-green-500/20 text-green-300`;
      case 'completed':
        return `${baseClasses} bg-blue-500/20 text-blue-300`;
      case 'in progress':
        return `${baseClasses} bg-yellow-500/20 text-yellow-300`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-300`;
    }
  }

  private animateHeader(): void {
    const header = document.querySelector('.header');
    if (header) {
      setTimeout(() => {
        header.classList.add('animate-in');
      }, 100);
    }
  }

  private animateProjectCards(): void {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.classList.remove('animate-in');
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 50);
    });
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  trackByProject(index: number, project: Project): string {
    return project.id;
  }
}
