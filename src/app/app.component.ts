import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimetrackerService } from './services/timetracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideReminder: boolean;
  reminderTitle: string;

  constructor(
    private timetrackerService: TimetrackerService
  ) {
    this.timetrackerService.reminderShow.subscribe(
      data => {
        this.hideReminder = data.isShow;
        this.reminderTitle = data.title;
      }
    )
  }

  public closeModal(IsStarted: boolean) {
    this.hideReminder = true;
  }

}
