import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css'],
})
export class ModalInfoComponent implements OnInit {

  @Input() modalType: string;
  @Input() modalText: string;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  private closeModal() {
    this.isConfirmed.emit(false);
  }
  constructor() {}

  ngOnInit() {
  }

}
