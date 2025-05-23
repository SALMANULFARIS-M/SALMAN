import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() scrollToSection = new EventEmitter<string>();

 navigate(id: string) {
  this.scrollToSection.emit(id);
}
}
