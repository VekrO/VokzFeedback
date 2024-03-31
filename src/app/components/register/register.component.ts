import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Register } from '../../models/Register.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule
  ],
  providers: [
    AuthenticationService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  public formulario = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(3)])
  });

  submit() {
    
    const data: Register = new Register();
    data.email = this.formulario.value.email ?? '';
    data.name = this.formulario.value.name ?? '';
    data.password = this.formulario.value.password ?? '';
    this.authenticationService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Contra criada com sucesso!'
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO!',
          detail: err.error
        });
      }
    });

  }

}
