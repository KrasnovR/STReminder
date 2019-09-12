import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service'

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {

  constructor(
    private reminderService: ReminderService,
  ) { }

  checkBoxis: NodeListOf<HTMLElement>;
  modalBlock: NodeListOf<HTMLElement>;

  typesOfShoes: string[] = this.reminderService.returnItems();

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkBoxis = document.querySelectorAll('.mat-pseudo-checkbox');
    this.modalBlock = document.querySelectorAll('.modal-info');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  showModalBlock() {
    this.modalBlock[0].classList.add('show-modal');
    this.checkBoxis.forEach(elem => elem.style.display = 'inline-block');
  }

  hideModalBlock() {
    this.modalBlock[0].classList.remove('show-modal');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  checkboxCheck(shoesLength: number) {
    shoesLength ? this.showModalBlock() : this.hideModalBlock();
  }
}
