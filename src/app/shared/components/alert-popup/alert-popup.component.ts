import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent {

  @Input() alertMessage: string = '';
  @Input() alertColor: string = '';

}
