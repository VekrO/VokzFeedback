import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Login } from '../../models/Login.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  constructor() {}

  public formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(3)])
  });

  submit() {
    
    const data: Login = new Login();

    data.email = this.formulario.value.email ?? '';
    data.password = this.formulario.value.password ?? '';

    this.messageService.clear();

    this.authenticationService.login(data).subscribe({
      next: (res) => {
        this.authenticationService.setToken(res.token);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Login realizado com sucesso!'
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
