import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { IReminder, IFormatedReminder} from '../reminder';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) {
  }


  checkBoxes: NodeListOf<HTMLElement>;
  modalBlock: NodeListOf<HTMLElement>;
  reminderList: IFormatedReminder[];
  showUpdate = false;
  modalText: string;
  modalType: string;

  isModalInfoVisible = false;

  showModal(type: string, text?: string) {
    this.isModalInfoVisible = true;
    this.modalText = text;
    this.modalType = type;
  }

  public closeModal(isConfirmed: boolean) {
    this.isModalInfoVisible = false;
  }

  ngOnInit() {
  }

  setCheckBoxes() {
    this.checkBoxes = document.querySelectorAll('.mat-pseudo-checkbox');
  }

  ngAfterViewInit() {
    this.setCheckBoxes();
    this.modalBlock = document.querySelectorAll('.modal-info');
    this.checkBoxes.forEach(elem => elem.style.opacity = '0');
  }

  showModalBlock(shoesLength: number) {
    this.setCheckBoxes();
    this.modalBlock[0].classList.add('show-modal');
    this.checkBoxes.forEach(elem => elem.style.opacity = '1');
    this.showUpdate = shoesLength !== 1;
  }

  hideModalBlock() {
    this.setCheckBoxes();
    this.modalBlock[0].classList.remove('show-modal');
    this.checkBoxes.forEach(elem => elem.style.opacity = '0');
  }

  checkboxCheck(shoesLength: number) {
    shoesLength ? this.showModalBlock(shoesLength) : this.hideModalBlock();
  }

  getReminders() {
    this.apiService.getRemindersList().subscribe(
      (data: IReminder[]) => {
        this.reminderList = this.showRemindersList(data);
      },
      (error) => {
        this.showModal('error', error.status);
      }
    );
  }

  showRemindersList(reminderArray: IReminder[]): IFormatedReminder[] {
    return reminderArray.map(reminder => {
      const result = this.formateDateTime(reminder.date);
      return {
        date: result.date,
        time: result.time,
        id: reminder.id,
        note: reminder.note,
      };
    });
  }

  formateDateTime(dateTimeStr: string) {
    const date: Date = new Date(dateTimeStr);
    const formateDate = `${('00' + date.getDate()).slice(-2)}.${('00' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
    const formateTime = `${('00' + date.getHours()).slice(-2)}:${('00' + date.getMinutes()).slice(-2)}`;

    return {
      date: formateDate,
      time: formateTime,
    };
  }
}
