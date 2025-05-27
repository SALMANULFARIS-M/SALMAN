import { Component } from '@angular/core';
import { PlatformService } from '../../../core/services/platform.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,LucideAngularModule,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private platformService: PlatformService) { }

  ngOnInit(): void {
    if (this.platformService.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.contact-section', {
        scrollTrigger: '.contact-section',
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
      });
    }
  }
}
