import {CFG} from './cfg';
import Cell from './Cell';
import {EventEmitter} from './service'

export default class Map {
  constructor() {
    const canvas = document.createElement('canvas');
    canvas.id = CFG.idSelector;
    canvas.width = CFG.width;
    canvas.height = CFG.height;
    document.body.appendChild(canvas);

    this.context = canvas.getContext('2d');
    this.cellList = this._generateCells();
  }

  render() {
    // Рендер всех ячеек
    this.cellList.forEach((items) => {
      items.forEach((cell) => {
        cell.render();
      });
    });
  }

  // Создание 2-х мерной карты с ячейками
  _generateCells() {
    const cellList = [];
    for (let row = 0; row < CFG.MAX_ROW; row++) {
      cellList[row] = [];
      for (let col = 0; col < CFG.MAX_COL; col++) {
        cellList[row][col] = new Cell(col, row, true, this.context);
      }
    }

    return cellList;
  }

}