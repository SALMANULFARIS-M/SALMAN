import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-three-background-about',
  imports: [],
  templateUrl: './three-background-about.component.html',
  styleUrl: './three-background-about.component.css'
})
export class ThreeBackgroundAboutComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId!: number;
  private particles!: THREE.Points;
  constructor(private platformService: PlatformService) { }

  ngOnInit() {
    if (this.platformService.isBrowser) {
      this.initThree();
      this.animate();
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  ngOnDestroy() {
    if (this.platformService.isBrowser) {
      cancelAnimationFrame(this.animationFrameId);
      window.removeEventListener('resize', this.onWindowResize);
      this.renderer.dispose();
    }
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200)
      );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.5 });
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = () => {
    this.particles.rotation.y += 0.0015;
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
