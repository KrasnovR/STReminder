import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {

  constructor(
    private reminderService: ReminderService,
    private apiService: ApiService,
  ) { }

  checkBoxis: NodeListOf<HTMLElement>;
  modalBlock: NodeListOf<HTMLElement>;

  typesOfShoes: string[] = this.reminderService.returnItems();
  remiderList: object[];
  isShowUpdate = false;
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkBoxis = document.querySelectorAll('.mat-pseudo-checkbox');
    this.modalBlock = document.querySelectorAll('.modal-info');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  showModalBlock(shoesLength: number) {
    this.modalBlock[0].classList.add('show-modal');
    this.checkBoxis.forEach(elem => elem.style.display = 'inline-block');
    this.isShowUpdate = !(shoesLength > 1);
  }

  hideModalBlock() {
    this.modalBlock[0].classList.remove('show-modal');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  checkboxCheck(shoesLength: number) {
    shoesLength ? this.showModalBlock(shoesLength) : this.hideModalBlock();
  }

  testApi() {
    this.apiService.getRemindersList().subscribe((data: object[]) => this.remiderList = data);
    console.log(this.remiderList);
  }
}
