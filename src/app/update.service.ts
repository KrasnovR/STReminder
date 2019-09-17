import { Injectable } from '@angular/core';
import { IFormatedReminder } from './reminder';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  serviceData: IFormatedReminder;
  constructor() { }
}
