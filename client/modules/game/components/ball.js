import {Game} from '../service';

export default class Ball {
  constructor() {
    this.cell = this.setStartCell();
  }

  // Мяч на центр
  setStartCell() {
    let cell = Game.cellList[6][4];
    if (false) { // Начало раунда правой команды
      cell = Game.cellList[7][4];
    }
    this.cell = cell;
  }

  // установить в клетку
  setBallInCell(cell) {
    this.cell = cell;
  }

}