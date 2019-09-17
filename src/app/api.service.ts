import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFormatedReminder } from './reminder';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  LINK = 'https://europe-west1-st-testcase.cloudfunctions.net';
  USER_ID = 'ZWPnKOK4XDYiYh9wEX3v';
  reminderList: IFormatedReminder[] = [];

  getRemindersList() {
    return this.httpClient.get(`${this.LINK}/api/reminders?userId=${this.USER_ID}`);
  }

  setReminder(name: string, dateStr: string) {
    return this.httpClient.post(`${this.LINK}/api/reminders?userId=${this.USER_ID}`, { "note": name, "date": dateStr });
  }

  updateReminder(reminderId: string, name: string, dateStr: string) {
    return this.httpClient.put(`${this.LINK}/api/reminders/${reminderId}?userId=${this.USER_ID}`, { "note": name, "date": dateStr });
  }

  deleteReminder(reminderId: string) {
    return this.httpClient.delete(`${this.LINK}/api/reminders/${reminderId}?userId=${this.USER_ID}`);
  }
}
