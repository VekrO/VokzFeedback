import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/Feedback.model';
import { UserData } from '../../models/UserData.model';
import { AuthenticationService } from '../../services/authentication.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TagModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RippleModule
  ],
  providers: [
    FeedbackService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public userData: UserData = new UserData();
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private feedbackService: FeedbackService = inject(FeedbackService);
  private router: Router = inject(Router);

  public filters = ['Elogio', 'Ideia', 'Problema'];
  public formulario: FormGroup = new FormGroup({
    filtering: new FormControl('Elogio')
  });

  public feedbacks$?: Observable<Feedback[]>;

  ngOnInit(): void {
    this.userData.id = this.authenticationService.getUserId();
    this.getFeedbackByStatus();
  }

  getFeedbackByStatus() {
    this.feedbacks$ = this.feedbackService.getByStatus(this.userData.id, this.formulario.value.filtering);
  }

  deleteFeedback(feedback: Feedback) {
    if(feedback && feedback.id) {
      this.feedbackService.delete(feedback.id).subscribe({
        next: () => {
          console.log('deletou com sucesso!');
        },
        error: (err) => {
          console.log('erro: ', err);
        }
      })
    }
  }

  signout() {
    this.authenticationService.removeToken();
    this.router.navigate(['/login']);
  }

}
