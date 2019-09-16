import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

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
    private config: NgbTimepickerConfig
  ) {
    config.spinners = false;
  }

  time: ItimePicker;
  date: Date;
  name: string;

  ngOnInit() {

  }
  onSubmit() {
    const newDate = new Date(this.date.setHours(this.time.hour, this.time.minute));

    this.apiService.setReminder(this.name, newDate.toISOString());
  }
}
