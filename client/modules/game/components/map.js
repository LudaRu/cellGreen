import Cell from './Cell';

export default class Map {
  constructor() {
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

}