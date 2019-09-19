import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UpdateService } from '../services/update.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { IFormatedReminder } from '../reminder';
import { Router } from '@angular/router';

interface ItimePicker {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  get selectedReminder(): IFormatedReminder {
    return this.updateService.serviceData;
  }
  reminderInfo: IFormatedReminder;

  constructor(
    private apiService: ApiService,
    private config: NgbTimepickerConfig,
    private updateService: UpdateService,
    private router: Router
  ) {
    config.spinners = false;
  }

  time: ItimePicker;
  date: Date;
  name: string;

  modalText: string;
  modalType: string;

  isModalInfoVisible = false;

  ngOnInit() {
    this.reminderInfo = this.selectedReminder;
    this.setReminderInfo();
  }

  public closeModal(isConfirmed: boolean) {
    this.isModalInfoVisible = false;
    this.router.navigate(['/']);
  }

  setReminderInfo() {
    const time: string = this.reminderInfo.time;
    const parts: string[] = this.reminderInfo.date.split('.');
    this.name = this.reminderInfo.note;
    this.time = {
      hour: Number(time.slice(0, 2)),
      minute: Number(time.slice(3, 5)),
      second: 0
    };
    this.date = new Date(`${parts[1]}.${parts[0]}.${parts[2]}`);
  }

  showModal(type: string, text?: string) {
    this.isModalInfoVisible = true;
    this.modalText = text;
    this.modalType = type;
  }

  onSubmit() {
    const newDate = new Date(this.date.setHours(this.time.hour, this.time.minute));

    this.apiService.updateReminder(this.reminderInfo.id, this.name, newDate.toISOString()).subscribe(
      (data) => {
        this.showModal('update', this.name);
      },
      (error) => {
        this.showModal('error', error.status);
      }
    );
  }

}
