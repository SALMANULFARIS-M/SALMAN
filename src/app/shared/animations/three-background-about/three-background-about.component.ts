import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-three-background-about',
  imports: [],
  templateUrl: './three-background-about.component.html',
  styleUrl: './three-background-about.component.css'
})
export class ThreeBackgroundAboutComponent implements  OnDestroy {
 @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId!: number;
  private particles!: THREE.Points;
  private resizeObserver!: ResizeObserver;

  constructor(private platformService: PlatformService) {}

  ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.initThree();
      this.setupResizeObserver();
      this.animate();
    }
  }

  ngOnDestroy() {
    if (this.platformService.isBrowser) {
      cancelAnimationFrame(this.animationFrameId);
      this.resizeObserver?.disconnect();
      this.cleanupThree();
    }
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer with more optimized settings
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    this.renderer.setSize(width, height, false);
    this.renderer.setClearColor(0x000000, 0);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Optimized particles
    const geometry = new THREE.BufferGeometry();
    const count = 5000; // Reduced count for better performance
    const vertices = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      vertices[i] = (Math.random() - 0.5) * 200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      depthTest: false // Better for background elements
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = () => {
    this.particles.rotation.y += 0.0015;
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      const canvas = this.canvasRef.nativeElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    });

    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  private cleanupThree() {
    this.scene?.remove(this.particles);
    this.particles?.geometry?.dispose();
    if (Array.isArray(this.particles?.material)) {
      this.particles.material.forEach(mat => mat.dispose());
    } else {
      this.particles?.material?.dispose();
    }
    this.renderer?.dispose();
    // @ts-ignore - Force memory cleanup
    this.renderer = null;
    this.scene = null!;
    this.camera = null!;
    this.particles = null!;
  }
}
