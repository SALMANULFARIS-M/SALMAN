import { RenderMode, ServerRoute } from '@angular/ssr';

const sections = [
  { name: 'Hero', path: '' },
  { name: 'About', path: 'about' },
  { name: 'Skills', path: 'skills' },
  { name: 'Projects', path: 'projects' },
  { name: 'Contact', path: 'contact' }
];
export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: ':section',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve(
        sections
          .filter(s => s.path && s.path !== '')
          .map(s => ({ section: s.path }))
      );
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
