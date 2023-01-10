import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAuth } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  @Input() isMenuOpen: boolean = false;

  userId: any;
  users: any;
  user: any;
  fullName: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get single User Informations
    this.userId = JSON.parse(localStorage.getItem('id') || '{}')
    this.users = this.authService.getSingleUser(this.userId).subscribe((res: any) => {
      res.forEach((r: any) => {
        let item = r.payload.doc.data() as IAuth
        this.user = item
        this.fullName = `${this.user.firstName}  ${this.user.lastName}`
        
      });
    })
  }

  // Toggle Menu
  toggleMenu() {
    this.hamClick.emit();
  }
}
