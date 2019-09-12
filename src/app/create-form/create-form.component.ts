import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) { }

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
