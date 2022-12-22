import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-back-top',
  templateUrl: './go-back-top.component.html',
  styleUrls: ['./go-back-top.component.scss']
})
export class GoBackTopComponent {
  windowScrolled: boolean;

  constructor() { }

  // When user scroll 300 away from the top of the document
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      this.windowScrolled = true;
    }
    else {
      this.windowScrolled = false;
    }
  }

  ngOnInit(): void {
  }
  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
