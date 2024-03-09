import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Feedback } from '../../models/Feedback.model';
import { WidgetService } from '../../services/widget.service';

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
  providers: [
    WidgetService
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent implements OnInit {

  public isSelected: boolean = false;
  public sended: boolean = false;
  public selectedTypeText: string = '';
  public selectedType: string = '';

  public formulario = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  private id: string = '';

  constructor(private route: ActivatedRoute, private service: WidgetService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (res: Params) => {
        if(res && res['id']) {
          this.id =  res['id'];
          console.log('id: ', this.id);
        }
      }
    })
  }

  onSelect(type: string) {

    this.isSelected = true;

    if(type == 'voltar') {
      this.reset();
      return;
    }

    switch(type) {
      case 'elogio':
        this.selectedTypeText = 'Faça um elogio';
        this.selectedType = 'Elogio';
        break;
      case 'ideia':
        this.selectedTypeText = 'Compartilhe uma ideia';
        this.selectedType = 'Ideia';
        break;
      case 'problema':
        this.selectedTypeText = 'Reporte um problema'
        this.selectedType = 'Problema'
        break;
    }
  }

  submit() {

    const feedback: Feedback = new Feedback();
    feedback.userId = this.id;
    feedback.description = this.formulario.value.description ?? '';
    feedback.sender = 'cgrenancontato@hotmail.com';
    feedback.status = this.selectedType;
    
    this.service.post(feedback).subscribe({
      next: (res) => {
        console.log('resposta do submit: ', res);
        this.isSelected = false;
        this.sended = true;
      },
      error: (err) => {
        console.log('erro no envio do submit: ', err);
        this.sended = false;
      }
    });

  }

  reset() {
    this.isSelected = false;
    this.sended = false;
    this.formulario.reset();
  }

}
