import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { UpdateService } from '../services/update.service';
import { TimetrackerService } from '../services/timetracker.service';
import { Router } from '@angular/router';

import { IReminder, IFormatedReminder } from '../reminder';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {

  set data(value: IFormatedReminder) {
    this.updateService.serviceData = value;
  }

  set reminderTrackList(value: IFormatedReminder[]) {
    this.timetrackerService.reminderList = value;
  }

  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService,
    private updateService: UpdateService,
    private timetrackerService: TimetrackerService,
    private router: Router
  ) {
  }

  checkBoxes: NodeListOf<HTMLElement>;
  modalBlock: NodeListOf<HTMLElement>;
  reminderList: IFormatedReminder[] = [];
  selectedReminders: IFormatedReminder[];
  showUpdate = false;
  modalText: string;
  modalType: string;

  isModalInfoVisible: boolean;
  isListEmpty: boolean;

  showModal(type: string, text: string) {
    this.modalText = text;
    this.modalType = type;
    this.isModalInfoVisible = true;
  }

  public closeModal(isConfirmed: boolean) {
    this.isModalInfoVisible = false;
  }

  ngOnInit() {
    this.getReminders();
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


  setRemindersList(reminderArray: IReminder[]) {
    if (reminderArray.length) {
      this.reminderList = reminderArray.map(reminder => {
        const result = this.formateDateTime(reminder.date);
        const status = this.getDateTimeStatus(reminder.date);

        return {
          date: result.date,
          time: result.time,
          id: reminder.id,
          note: reminder.note,
          status: status,
        };
      });

      this.setReminderTrackList(this.reminderList);
    } else {
      this.isListEmpty = true;
    }
  }

  setReminderTrackList(reminderArray: IFormatedReminder[]) {
    this.reminderTrackList = reminderArray.filter(reminder => reminder.status === 'green');

    if (this.timetrackerService.intervalId === undefined) {
      this.timetrackerService.startTracking();
    }
  }

  getDateTimeStatus(dateTimeStr: string) {
    const DateTimeNow = new Date();
    const dateTimeReminder = new Date(dateTimeStr);
    let result = 'green';

    if ((DateTimeNow.getTime() - dateTimeReminder.getTime()) > 0) {
      result = 'red';
    }

    return result;
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

  checkboxCheck(shoesLength: number) {
    shoesLength ? this.showModalBlock(shoesLength) : this.hideModalBlock();
  }

  getReminders() {
    this.apiService.getRemindersList().subscribe(
      (data: IReminder[]) => {
        this.setRemindersList(data);
      },
      error => {
        this.showModal('error', error.status);
      },
    );
  }

  updateReminder() {
    this.data = this.selectedReminders[0];
    this.router.navigate(['/update']);
  }

  deleteReminder() {
    this.selectedReminders.forEach(reminder => {
      this.apiService.deleteReminder(reminder.id).subscribe();
      this.reminderList = this.reminderList.filter(value => value.id !== reminder.id);
    });
    this.hideModalBlock();
  }

}
