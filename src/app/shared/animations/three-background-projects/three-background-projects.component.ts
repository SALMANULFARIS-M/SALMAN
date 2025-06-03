import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-three-background-projects',
  imports: [],
  templateUrl: './three-background-projects.component.html',
  styleUrl: './three-background-projects.component.css'
})
export class ThreeBackgroundProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  constructor(private platformService: PlatformService, private ngZone: NgZone, private el: ElementRef) { }

  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      this.initThreeJS();
    }
  }

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.animate();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    // Get the container element
    const container = this.el.nativeElement.querySelector('#background-canvas');

    // Create scene
    this.scene = new THREE.Scene();

    // Create camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 500;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: container,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 1000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        this.animationId = requestAnimationFrame(animateFn);

        // Rotate particles
        if (this.scene.children[0]) {
          this.scene.children[0].rotation.x += 0.001;
          this.scene.children[0].rotation.y += 0.002;
        }

        this.renderer.render(this.scene, this.camera);
      };

      animateFn();
    });
  }

  onResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }


}
