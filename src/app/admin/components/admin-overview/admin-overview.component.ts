import { Component } from '@angular/core';
import { IAuth } from 'src/app/shared/interfaces/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent {

  userId: any;
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get single User Informations
    this.userId = JSON.parse(localStorage.getItem('id') || '{}')
    this.authService.getSingleUser(this.userId).subscribe((res: any) => {
      res.forEach((r: any) => {
        let item = r.payload.doc.data() as IAuth
        this.user = item

        console.log(this.user);
        
      });
    })
  }

}
