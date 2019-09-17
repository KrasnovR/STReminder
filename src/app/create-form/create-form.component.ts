import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface ItimePicker {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private config: NgbTimepickerConfig,
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

  }

  public closeModal(isConfirmed: boolean) {
    this.isModalInfoVisible = false;
    this.router.navigate(['/']);
  }

  showModal(type: string, text?: string) {
    this.isModalInfoVisible = true;
    this.modalText = text;
    this.modalType = type;
  }

  onSubmit() {
    const newDate = new Date(this.date.setHours(this.time.hour, this.time.minute));

    this.apiService.setReminder(this.name, newDate.toISOString()).subscribe(
      (data) => {
        this.showModal('create', this.name);
      },
      (error) => {
        this.showModal('error', error.status);
      }
    );
  }
}
