import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) {
  }

  checkBoxis: NodeListOf<HTMLElement>;
  modalBlock: NodeListOf<HTMLElement>;
  typesOfShoes: string[];
  remiderList: object[];
  showUpdate = false;
  modalText: string;
  modalType: string;

  isModalInfoVisible = false;

  public closeModal(isConfirmed: boolean) {
    this.isModalInfoVisible = false;
  }

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
    this.showUpdate = shoesLength !== 1;
  }

  hideModalBlock() {
    this.modalBlock[0].classList.remove('show-modal');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  checkboxCheck(shoesLength: number) {
    shoesLength ? this.showModalBlock(shoesLength) : this.hideModalBlock();
  }

  getFormatedReminders() {
    this.apiService.getRemindersList().subscribe(
      (data: object[]) => {
        this.remiderList = data;
      },
      (error) => {
        this.isModalInfoVisible = true;
        this.modalText = error.status;
        this.modalType = 'error';
      }
    );
  }

  formateDateTime(dateTimeStr: string): object {
    const date: Date = new Date(dateTimeStr);
    const formateDate = `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`;
    const formateTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`;

    return {
      date: formateDate,
      time: formateTime,
    };
  }

}
