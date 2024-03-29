import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserData } from '../../models/UserData.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-implementation',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './implementation.component.html',
  styleUrl: './implementation.component.scss'
})
export class ImplementationComponent implements OnInit {

  public authenticationService: AuthenticationService = inject(AuthenticationService);
  public userData: UserData = new UserData();

  ngOnInit(): void {
    
    this.userData.id = this.authenticationService.getUserId();

  }

}
