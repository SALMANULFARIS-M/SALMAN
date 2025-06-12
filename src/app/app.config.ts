import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Contact, FolderGit2, Linkedin, LinkedinIcon, LucideAngularModule, PhoneCall } from 'lucide-angular';
// Lucide Icons
import { Camera,BadgeCheck,Mail, Code2, Briefcase, User, Home, Database, Server, Code, Cpu, FileCode, Zap, ArrowBigRight, Atom, Box, Brush, Cloud, CloudCog, CloudLightning, CloudSun, Film, GitBranch, Github, Globe, Layout, MessageCircleMore, Move3D, Palette, PlugZap, Send, ServerCog, ServerCrash, ShieldCheck, Sparkles, SquareStack, Layers, ServerCogIcon, Puzzle, Brain, Award, Wrench, GitMerge, Network, PenTool } from 'lucide-angular';

const lucideIcons = {
  Camera, Code2, Briefcase, User, Home, Database, Server, Code, Cpu, FileCode, Zap,
  Palette, Layout, Brush, BadgeCheck, Mail,FolderGit2,Contact,
  Cloud, CloudLightning, CloudCog, CloudSun,Linkedin,LinkedinIcon,
  Box, ServerCog, GitBranch, Github, Globe,PhoneCall,
  PlugZap, Send, MessageCircleMore, Award, Wrench,
  Move3D, Sparkles, Film, ServerCrash,
  Atom, ArrowBigRight, ShieldCheck, SquareStack, Layers, ServerCogIcon, GitMerge, Network, PenTool, Puzzle
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons))
  ]
};
