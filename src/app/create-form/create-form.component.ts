import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';


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

  time: object;
  date: Date;
  name: string;

  ngOnInit() {

  }
  onSubmit() {
    console.log(this.date);
    console.log(this.time);
    console.log(this.name);
  }
}
