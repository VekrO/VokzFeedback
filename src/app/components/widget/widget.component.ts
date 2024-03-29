import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Feedback } from '../../models/Feedback.model';
import { MomentService } from '../../services/moment.service';
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
    WidgetService,
    MomentService
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private momentService: MomentService = inject(MomentService);
  private service: WidgetService = inject(WidgetService);

  public isSelected: boolean = false;
  public sended: boolean = false;
  public selectedTypeText: string = '';
  public selectedType: string = '';

  public formulario = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  private id: string = '';
  private sender: string = '';

  ngOnInit(): void {
    console.log('WIDGET TO DATE: ', moment().toDate())
    this.route.queryParams.subscribe({
      next: (res: Params) => {

        if(res && res['id']) {
          this.id =  res['id'];
        }

        if(res && res['sender']) {
          this.sender = res['sender']; 
        } else {
          this.sender = 'Não informado';
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
    feedback.sender = this.sender;
    feedback.status = this.selectedType;
    feedback.dateHour = this.momentService.getDate();

    this.service.post(feedback).subscribe({
      next: () => {
        this.isSelected = false;
        this.sended = true;
      },
      error: (err) => {
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
