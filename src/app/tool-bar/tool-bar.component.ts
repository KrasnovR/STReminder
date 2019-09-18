import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  itemsLength: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.itemsLength = this.apiService.reminderList.length;
  }

}
