import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TimetrackerService } from '../services/timetracker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-reminder',
  templateUrl: './modal-reminder.component.html',
  styleUrls: ['./modal-reminder.component.css']
})
export class ModalReminderComponent implements OnInit {


  @Input() reminderTitle: string;
  @Input() hideReminder: boolean;
  @Output() IsStarted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private timetrackerService: TimetrackerService,
    private router: Router
  ) { }


  closeModal() {
    this.timetrackerService.reminderShow.next({ isShow: false, title: '' });
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
