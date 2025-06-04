import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlatformService } from '../../../core/services/platform.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import * as THREE from 'three';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})


export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('particleCanvas', { static: true }) particleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('titleRef') titleRef!: ElementRef;
  @ViewChild('formRef') formRef!: ElementRef;
  @ViewChild('socialRef') socialRef!: ElementRef;

  contactForm: FormGroup;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;

  constructor(private fb: FormBuilder, private platformService: PlatformService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      this.initAnimations();
    }
  }
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.initParticleSystem();
      this.initScrollAnimations();
    }
  }
  private initParticleSystem(): void {
    const canvas = this.particleCanvas.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      positions[i + 2] = (Math.random() - 0.5) * 2000;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.camera.position.z = 1000;
    this.animate();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.001;

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initAnimations(): void {
    // GSAP timeline for initial animations
    const tl = gsap.timeline();

    tl.from(".holographic-text", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
      .from(".glass-morphism", {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.5")
      .from(".futuristic-input-group", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.8");
  }

  private initScrollAnimations(): void {
    gsap.from(this.socialRef.nativeElement.children, {
      scrollTrigger: this.socialRef.nativeElement,
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  onInputFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    gsap.to(input, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  onInputBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    gsap.to(input, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  onButtonHover(event: Event): void {
    const button = event.target as HTMLButtonElement;
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  onButtonLeave(event: Event): void {
    const button = event.target as HTMLButtonElement;
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  onSocialHover(event: Event): void {
    const link = event.currentTarget as HTMLElement;
    const icon = link.querySelector('.social-icon') as HTMLElement;

    gsap.to(icon, {
      rotation: 360,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  onSocialLeave(event: Event): void {
    const link = event.currentTarget as HTMLElement;
    const icon = link.querySelector('.social-icon') as HTMLElement;

    gsap.to(icon, {
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.contactForm.value);

      // Success animation
      gsap.to('.quantum-button', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Show success message or redirect
        }
      });
    }
  }
}
