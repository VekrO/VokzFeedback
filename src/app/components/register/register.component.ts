import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    HttpClientModule,
    ButtonModule
  ],
  providers: [
    AuthenticationService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authenticationService: AuthenticationService) {}

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
      next: (res) => {
        console.log('resposta do registro: ', res);
      },
      error: (err) => {
        console.log('erro no registro: ', err);
      }
    });

  }

}
