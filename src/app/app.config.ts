import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { Camera, Code2, Briefcase, User, Home } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    // 👇 Add this to make ng-particles work globally
    importProvidersFrom(LucideAngularModule.pick({ Camera,Code2,Briefcase,User,Home } )
)]
};
