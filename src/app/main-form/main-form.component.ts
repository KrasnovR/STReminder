import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  checkBoxis: NodeListOf<HTMLElement>;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor() { }

  ngOnInit() {
    window.onresize = () => this.setModalPosition();
  }

  setModalPosition(shoesLength?: number) {
    const modalBlock: NodeListOf<HTMLElement> = document.querySelectorAll('.modal-info');
    const windowHeight: number = window.innerHeight;
    const windowWidth: number = window.innerWidth;
    modalBlock[0].style.top = `${windowHeight - 130}px`;
    modalBlock[0].style.left = `${windowWidth - 330}px`;
    if (shoesLength !== undefined) {
      shoesLength ? modalBlock[0].classList.add('show-modal')
                : modalBlock[0].classList.remove('show-modal');
    }
  }

  ngAfterViewInit() {
    this.checkBoxis = document.querySelectorAll('.mat-pseudo-checkbox');
    this.checkBoxis.forEach(elem => elem.style.display = 'none');
  }

  checkboxCheck(shoesLength: number) {
    if (shoesLength === 0) {
      this.checkBoxis.forEach(elem => elem.style.display = 'none');
    } else {
      this.checkBoxis.forEach(elem => elem.style.display = 'inline-block');
    }
    this.setModalPosition(shoesLength);
  }
}
