import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { FeedbackService } from '../../services/feedback.service';
import { ModalService } from '../../services/modal.service';
import { UtilService } from '../../services/util.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
    RippleModule,
    RouterOutlet,
    SidebarComponent
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

  ngOnInit(): void {
    
  }

}
