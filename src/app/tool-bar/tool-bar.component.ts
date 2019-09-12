import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  itemsLength: number;
  constructor(
    private reminderService: ReminderService,
  ) { }

  ngOnInit() {
    this.itemsLength = this.reminderService.returnItems().length;
  }

}
