import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private readonly platform: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.platform = platformId.toString();
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  get isIonic(): boolean {
    return this.isBrowser && !!(window as any)['Ionic'];
  }

  get isElectron(): boolean {
    return this.isBrowser && !!window['process']?.versions?.['electron'];
  }
}
