import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextareaModule
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {

  public isSelected: boolean = false;
  public selectedType: string = '';

  public formulario = new FormGroup({
    descricao: new FormControl('', [Validators.required])
  });

  onSelect(type: string) {

    this.isSelected = true;

    if(type == 'voltar') {
      this.reset();
      return;
    }

    switch(type) {
      case 'elogio':
        this.selectedType = 'Faça um elogio';
        break;
      case 'ideia':
        this.selectedType = 'Compartilhe uma ideia';
        break;
      case 'problema':
        this.selectedType = 'Reporte um problema'
        break;
    }
  }

  reset() {
    this.isSelected = false;
    this.formulario.reset();
  }

}
