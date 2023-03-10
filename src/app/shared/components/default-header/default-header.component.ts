import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, timeout, delay } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent implements OnInit {

  @ViewChild('menuArea') menuArea: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  isHamClick: boolean = false

  windowScrolled: boolean;
  products: any;

  constructor(private renderer: Renderer2, private cartService: CartService, private router: Router) { }
  
  // When user scroll 300 away from the top of the document
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else {
      this.windowScrolled = false;
    }
  }
  ngOnInit(): void {
    
    // Click Outside to close element
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   let x = !this.menuArea.nativeElement.contains(e.target)
    //   let y = !this.menuBtn.nativeElement.contains(e.target)
    //   if (x && y) {
    //     console.log(y);
        
    //     this.isHamClick = false;
    //   }
    // });

    // Get products from cart
    this.products = this.cartService.loadCart()

  }

  // Toggle Menu
  toggleMenu() {
    this.isHamClick = !this.isHamClick
  }

  // Navigate to about
  navigateToAbout() {
    this.router.navigate(['/'], { fragment: 'about' });

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      delay(0),
      timeout(1000)
    )
    .subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        const element = document.querySelector(`#${fragment}`);
        if (element) {
          element.scrollIntoView();
        }
      }
    });

    this.isHamClick = false
  }

  // Navigate to about
  navigateToContact() {
    this.router.navigate(['/'], { fragment: 'contact' });

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      delay(0),
      timeout(1000)
    )
    .subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        const element = document.querySelector(`#${fragment}`);
        if (element) {
          element.scrollIntoView();
          // this.info.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        }
      }
    });

    this.isHamClick = false
  }
}
