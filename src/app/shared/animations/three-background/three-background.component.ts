import { Component } from '@angular/core';
import * as THREE from 'three';
import {createNoise3D } from 'simplex-noise';
import { AfterViewInit, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-three-background',
  imports: [],
  templateUrl: './three-background.component.html',
  styleUrl: './three-background.component.css'
})
export class ThreeBackgroundComponent implements AfterViewInit {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;
      // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Setup lights
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating particle grid
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 100;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 100;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 100;

      particleSizes[i] = Math.random() * 0.5 + 0.1;

      // Cyan to magenta color range
      particleColors[i3] = Math.random() * 0.5;
      particleColors[i3 + 1] = Math.random() * 0.8 + 0.2;
      particleColors[i3 + 2] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: new THREE.TextureLoader().load('data:image/png;base64,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') }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 pos = position;
          // Add wave motion to particles
          pos.y += sin(pos.x * 0.1 + time * 0.5) * 0.8;
          pos.x += sin(pos.z * 0.1 + time * 0.3) * 0.8;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          // Size attenuation
          gl_PointSize = size * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create holographic data grid
    const gridGeometry = new THREE.PlaneGeometry(80, 80, 40, 40);
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPos;
        varying float vDistortion;

        void main() {
          vPos = position;
          // Create wave effect
          float distortion = sin(position.x * 0.1 + time * 0.5) * sin(position.y * 0.1 + time * 0.3) * 2.0;
          vDistortion = distortion * 0.3 + 0.7;
          vec3 pos = position;
          pos.z += distortion;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPos;
        varying float vDistortion;

        void main() {
          // Grid pattern
          float gridX = smoothstep(0.4, 0.6, abs(sin(vPos.x * 0.5)));
          float gridY = smoothstep(0.4, 0.6, abs(sin(vPos.y * 0.5)));
          float grid = max(gridX, gridY) * 0.3;

          // Create glowing grid lines with color gradient based on position
          vec3 color = mix(
            vec3(0.0, 1.0, 1.0), // Cyan
            vec3(1.0, 0.0, 1.0), // Magenta
            sin(vPos.x * 0.02 + time * 0.2) * 0.5 + 0.5
          );

          // Pulse effect
          float pulse = sin(time * 2.0) * 0.3 + 0.7;

          // Glow based on distortion
          float glow = smoothstep(0.2, 0.8, vDistortion) * pulse;

          gl_FragColor = vec4(color, grid * glow * 0.5);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = Math.PI / 2;
    grid.position.y = -10;
    scene.add(grid);

    // Create digital neural connections
    const connectionCount = 15;
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions = new Float32Array(connectionCount * 6); // 2 points per line
    const connectionColors = new Float32Array(connectionCount * 6); // RGB for each point

    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.7,
      transparent: true
    });

    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;

      // Start point
      connectionPositions[i6] = (Math.random() - 0.5) * 50;
      connectionPositions[i6 + 1] = (Math.random() - 0.5) * 50;
      connectionPositions[i6 + 2] = (Math.random() - 0.5) * 50;

      // End point
      connectionPositions[i6 + 3] = (Math.random() - 0.5) * 50;
      connectionPositions[i6 + 4] = (Math.random() - 0.5) * 50;
      connectionPositions[i6 + 5] = (Math.random() - 0.5) * 50;

      // Colors for each point
      connectionColors[i6] = 0.0;
      connectionColors[i6 + 1] = Math.random() * 0.8 + 0.2;
      connectionColors[i6 + 2] = Math.random() * 0.8 + 0.2;

      connectionColors[i6 + 3] = Math.random();
      connectionColors[i6 + 4] = Math.random() * 0.5;
      connectionColors[i6 + 5] = 1.0;
    }

    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute('color', new THREE.BufferAttribute(connectionColors, 3));

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Create holographic cube
    const cubeGeometry = new THREE.BoxGeometry(10,10,10);
    const cubeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          vec3 pos = position;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;

        void main() {
          // Create holographic edge effect
          float edge = max(
            max(
              smoothstep(2.3, 2.5, abs(vPosition.x)),
              smoothstep(2.3, 2.5, abs(vPosition.y))
            ),
            smoothstep(2.3, 2.5, abs(vPosition.z))
          );

          // Pulse effect
          float pulse = sin(time * 1.0) * 0.5 + 0.5;

          // Color gradient based on position
          vec3 color = mix(
            vec3(0.0, 1.0, 1.0), // Cyan
            vec3(1.0, 0.0, 1.0), // Magenta
            sin(vPosition.x * 0.5 + time * 0.3) * 0.5 + 0.5
          );

          gl_FragColor = vec4(color, edge * pulse * 0.8);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Create floating data points
    const dataPointCount = 50;
    const dataPointGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const dataPoints: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>[] = [];

    for (let i = 0; i < dataPointCount; i++) {
      const dataPointMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        transparent: true,
        opacity: 0.7,
        emissive: new THREE.Color(0.2, 0.2, 0.5)
      });

      const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMaterial);
      dataPoint.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      dataPoint.userData = {
        speed: Math.random() * 0.05 + 0.01,
        direction: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        )
      };

      scene.add(dataPoint);
      dataPoints.push(dataPoint);
    }

    // Create a noise generator
    const noise3D = createNoise3D();

    // Mouse interaction
    const mouse = new THREE.Vector2();
    let isMouseDown = false;

    document.addEventListener('mousedown', () => {
      isMouseDown = true;
    });

    document.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation function
    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.001; // convert to seconds

      // Update particle shader time uniform
      // Update particle shader time uniform
      particleMaterial.uniforms['time'].value = time;
      gridMaterial.uniforms['time'].value = time;
      cubeMaterial.uniforms['time'].value = time;

      // Rotate cube
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.003;

      // Move data points
      dataPoints.forEach(point => {
        // Add some noise to movement
        const noiseX = noise3D(
          point.position.x * 0.05,
          point.position.y * 0.05,
          time * 0.1
        ) * 0.02;

        const noiseY = noise3D(
          point.position.x * 0.05,
          point.position.z * 0.05,
          time * 0.1
        ) * 0.02;

        const noiseZ = noise3D(
          point.position.y * 0.05,
          point.position.z * 0.05,
          time * 0.1
        ) * 0.02;

        point.position.x += point.userData['direction'].x + noiseX;
        point.position.y += point.userData['direction'].y + noiseY;
        point.position.z += point.userData['direction'].z + noiseZ;

        // Bounds checking
        if (Math.abs(point.position.x) > 15) point.userData['direction'].x *= -1;
        if (Math.abs(point.position.y) > 15) point.userData['direction'].y *= -1;
        if (Math.abs(point.position.z) > 15) point.userData['direction'].z *= -1;

        // Pulse effect
        point.material.opacity = 0.4 + Math.sin(time * 2 + point.position.x * 0.1) * 0.3;
        point.scale.setScalar(0.8 + Math.sin(time * 3 + point.position.y * 0.1) * 0.2);
      });

      // Rotate connections
      connections.rotation.x = time * 0.05;
      connections.rotation.y = time * 0.03;

      // Move particles based on mouse position if mouse is down
      if (isMouseDown) {
        const positions = particleGeometry.attributes['position'].array;

        for (let i = 0; i < positions.length; i += 3) {
          // Calculate distance from center
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          // Move particles away from mouse position
          const dx = x - mouse.x * 50;
          const dy = y + mouse.y * 50;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 10) {
            positions[i] += dx * 0.01;
            positions[i + 1] += dy * 0.01;
            positions[i + 2] += (Math.random() - 0.5) * 0.1;
          }
        }

        particleGeometry.attributes['position'].needsUpdate = true;
      }

      // Slowly rotate scene
      scene.rotation.y = Math.sin(time * 0.1) * 0.2;
      scene.rotation.x = Math.sin(time * 0.15) * 0.1;

      // Render the scene
      renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();

  }
}
