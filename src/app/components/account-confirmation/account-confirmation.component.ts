import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AccountConfirmation } from '../../models/AccountConfirmation.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    RouterModule
  ],
  providers: [
    AuthenticationService
  ],
  template: '',
})
export class AccountConfirmationComponent implements OnInit {

  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  public formulario = new FormGroup({
    emailConfirmationCode: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (res: Params) => {
        if(res && res['code']) {
          this.formulario.controls['emailConfirmationCode'].setValue(res['code']);
          this.submit();
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  submit() {

    const data: AccountConfirmation = new AccountConfirmation();

    data.emailConfirmationCode = this.formulario.value.emailConfirmationCode ?? '';

    this.authenticationService.accountConfirmation(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Conta confirmada com sucesso!'
        });
      },
      error: (err) => {
        console.log('ERROR: ', err);
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO!',
          detail: err.error
        });
      }
    });

  }

}
