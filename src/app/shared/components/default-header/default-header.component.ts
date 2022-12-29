import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent implements AfterViewInit {

  @ViewChild('menuArea') menuArea: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  isHamClick: boolean = false

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    
    // Click Outside to close element
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   let x = !this.menuArea.nativeElement.contains(e.target)
    //   let y = !this.menuBtn.nativeElement.contains(e.target)
    //   if (x && y) {
    //     console.log(y);
        
    //     this.isHamClick = false;
    //   }
    // });
  }

  toggleMenu() {
    this.isHamClick = !this.isHamClick
  }

}
