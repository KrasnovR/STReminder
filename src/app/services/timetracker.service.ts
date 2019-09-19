import { Injectable } from '@angular/core';
import { IFormatedReminder } from '../reminder';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class TimetrackerService {
  public reminderShow: Subject<{ isShow: boolean, title: string }> = new Subject();
  reminderList: IFormatedReminder[];
  intervalId: any; // Ругается на NodeJS.Timer

  constructor() { }

  startTracking() {
       this.intervalId = setInterval(() => {

        if (this.reminderList.length) {
          this.reminderList.forEach((reminder, index) => {
            const DateTimeNow = new Date();
            const parts: string[] = reminder.date.split('.');
            const dateTimeReminder = new Date(`${parts[1]}.${parts[0]}.${parts[2]} ${reminder.time}`);

            if ((DateTimeNow.getTime() - dateTimeReminder.getTime()) >= 0) {
              this.reminderList.splice(index, 1);
              this.reminderShow.next({ isShow: true, title: reminder.note });
            }
          });

        } else {
          clearTimeout(this.intervalId);
        }
      }, 3000);
  }

}
