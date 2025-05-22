import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Camera, Code2, Briefcase, User, Home, Database, Server, Code, Cpu, FileCode, Zap, ArrowBigRight, Atom, Box, Brush, Cloud, CloudCog, CloudLightning, CloudSun, Film, GitBranch, Github, Globe, Layout, MessageCircleMore, Move3D, Palette, PlugZap, Send, ServerCog, ServerCrash, ShieldCheck, Sparkles, SquareStack,Layers,ServerCogIcon,Puzzle, Brain } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    // 👇 Add this to make ng-particles work globally
importProvidersFrom(
  LucideAngularModule.pick({
    // Existing icons (from your snippet)
    Camera, Code2, Briefcase, User, Home, Database, Server, Code, Cpu, FileCode, Zap,
    // New icons (added based on your skills data)
    Palette, Layout, Brush,                 // Tailwind/Bootstrap/CSS3
    Cloud, CloudLightning, CloudCog, CloudSun, // Vercel/Render/AWS/DigitalOcean
    Box, ServerCog, GitBranch, Github, Globe, // Docker/Nginx/Git/GitHub/DNS
    PlugZap, Send, MessageCircleMore,         // Socket.IO/Nodemailer/WhatsApp API
    Move3D, Sparkles, Film, ServerCrash, // GSAP/Tsparticles/Three.js/Angular Animations/SSR
    Atom, ArrowBigRight, ShieldCheck,SquareStack ,Layers,ServerCogIcon,Puzzle,Brain         // React/Next.js/NestJS
  })
)  ]
};
