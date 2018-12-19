import {CFG} from '../cfg';
import Cell from './Cell';
import {EventEmitter} from '../service';

export default class Map {
  constructor() {
    this.canvas = Map._drawHtml();
    this.context = this.canvas.getContext('2d');
    this.cellList = this._generateCells();
  }

  static _drawHtml() {
    const canvas = document.createElement('canvas');
    canvas.id = CFG.idSelector;
    canvas.width = CFG.width;
    canvas.height = CFG.height;
    document.body.appendChild(canvas);

    return canvas;
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
        cellList[row][col] = new Cell(col, row, false, this.context);
      }
    }

    return cellList;
  }

  /* Найти объекта канваса по X Y курсора*/
  getCanvasCellByPosition(row, col) {
    return this.cellList[row][col];
  }

}