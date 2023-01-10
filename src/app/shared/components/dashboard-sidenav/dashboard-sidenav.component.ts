import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent {
  @Input() navLinks: any;
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  user: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
  }

  // Close menu
  closeMenu() {
    this.hamClick.emit();
  }

  // Log out
  logOut() {
    this.firebaseService.signout();
  }
}
