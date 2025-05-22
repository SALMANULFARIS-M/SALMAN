import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-three-background-skills',
  imports: [],
  templateUrl: './three-background-skills.component.html',
  styleUrl: './three-background-skills.component.css'
})

export class ThreeBackgroundSkillsComponent {
  @ViewChild('particlesCanvas', { static: true }) particlesCanvas!: ElementRef<HTMLCanvasElement>;


  hoveredSkill: string | null = null;
  activeGroup = 0;
  public Math = Math;

  private animationFrameId!: number;
  private particles: Particle[] = [];
  private handleResize!: () => void;

  private platformService = inject(PlatformService);

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.initParticles();
    }
  }

  ngOnDestroy(): void {
    if (this.platformService.isBrowser) {
      cancelAnimationFrame(this.animationFrameId);
      window.removeEventListener('resize', this.handleResize);
    }
  }


  private initParticles(): void {
    const canvas = this.particlesCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    this.handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', this.handleResize);
  }

}
