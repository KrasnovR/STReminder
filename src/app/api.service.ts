import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  LINK = 'https://europe-west1-st-testcase.cloudfunctions.net';
  USER_ID = 'ZWPnKOK4XDYiYh9wEX3v';

  getRemindersList() {
    return this.httpClient.get(`${this.LINK}/api/reminders?userId=${this.USER_ID}`);
  }

  setReminder(name: string, date: Date) {
    this.httpClient.post(`${this.LINK}/api/reminders?userId=${this.USER_ID}`, { note: name, date: date.toString() });
  }

  updateReminder(reminderId: string, name: string, date: Date) {
    this.httpClient.put(`${this.LINK}/api/reminders/${reminderId}?userId=${this.USER_ID}`, { note: name, date: date.toString() });
  }

  deleteReminder(reminderId: string) {
    this.httpClient.delete(`${this.LINK}/api/reminders/${reminderId}?userId=${this.USER_ID}`);
  }
}
