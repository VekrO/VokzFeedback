import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/Feedback.model';
import { UserData } from '../../models/UserData.model';
import { AuthenticationService } from '../../services/authentication.service';
import { FeedbackService } from '../../services/feedback.service';
import { ModalService } from '../../services/modal.service';
import { UtilService } from '../../services/util.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
    DialogService,
    UtilService,
    ModalService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public userData: UserData = new UserData();
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private feedbackService: FeedbackService = inject(FeedbackService);
  private modalService: ModalService = inject(ModalService);
  private utilService: UtilService = inject(UtilService);
  private messageService: MessageService = inject(MessageService);
  
  public filters = ['Todos', 'Elogio', 'Ideia', 'Problema'];
  public formulario: FormGroup = new FormGroup({
    filtering: new FormControl('Todos')
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

    this.modalService.open(ConfirmationComponent, {
      title: 'Confirmação',
      message: 'Você tem certeza que deseja continuar ?',
      width: this.utilService.getModalWidth()
    }).subscribe({
      next: (res) => {
        console.log('res: ', res);
        if(res && res.status == 'SIM') {
          if(feedback && feedback.id) {
            this.feedbackService.delete(feedback.id).subscribe({
              next: () => {
                console.log('deletou com sucesso!');
                this.messageService.add({severity: 'success', summary: 'SUCESSO!', detail: 'Registro excluído com sucesso!'});
                this.getFeedbackByStatus();
              },
              error: (err) => {
                console.log('erro: ', err);
              }
            });
          }
        }
      }
    });
    
  }

  signout() {
    this.authenticationService.signout();
  }

}
