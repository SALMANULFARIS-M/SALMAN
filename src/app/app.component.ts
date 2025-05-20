import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'salman';
  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  } ngOnInit(): void {

    if (this.isBrowser) {
      this.updateFavicon();
      // Optional: Update favicon if the user switches theme at runtime
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        this.updateFavicon();
      });
    }
  }

  updateFavicon(): void {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon: HTMLLinkElement | null = document.querySelector('#favicon');
    if (favicon) {
      favicon.href = isDark ? 'icon-w.svg' : 'icon-b.svg';
    }
  }
}
