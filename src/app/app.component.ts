import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from './core/services/platform.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'salman';

  constructor(private platformService: PlatformService) { }

  ngOnInit(): void {
    if (this.platformService.isBrowser) {
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
