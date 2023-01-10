import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  hamClick: any;
  isMenuOpen: boolean;

  navLinks: any;

  constructor() {}

  ngOnInit(): void {}

  // Toggle Menu
  toggleMenu() {
    this.hamClick = !this.hamClick;
    this.isMenuOpen = this.hamClick;
  }
}
