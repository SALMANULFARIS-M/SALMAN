import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() sections: { icon: string }[] = [];
  @Input() currentIndex: number = 0;

  @Output() sectionChange = new EventEmitter<number>();

  navigateTo(index: number) {
    this.sectionChange.emit(index);
  }
}
