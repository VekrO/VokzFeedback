import { Component, ElementRef, Input, inject } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  
  private el: ElementRef = inject(ElementRef);
  public closeEvent: Subject<void> = new Subject();

  @Input() public title?: string = '';
  @Input() public message?: Object = {};
  @Input() public width?: string = '';
  @Input() public height?: string = '';
  @Input() public data?: {} = {};

  close() {
    this.el.nativeElement.remove();
    this.closeEvent.next();
  }

}
