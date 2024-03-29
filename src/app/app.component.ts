import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import moment from 'moment-timezone';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'vokz-feedback';

  ngOnInit(): void {
    console.log('MOMENT: ', moment().toDate())
  }

}
