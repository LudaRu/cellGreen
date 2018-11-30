import {CFG} from './cfg';
export default class Cell {
  constructor(colI, rowI, solid, context) {
    // Индексы в массиве объектов
    this.rowIndex = rowI;
    this.colIndex = colI;
    this.context = context;

    this.top = colI * CFG.cellWidth; // Позиция x
    this.left = rowI * CFG.cellHeight; // Позиция y
    this.solid = solid; // Выделение ячейки

    console.log('fff', this);
  }

  render(solid = undefined) {
    this.solid = !!this.solid;
    this.context.fillStyle = solid ? '#63e269' : '#4CAF50';
    this.context.fillRect(this.top, this.left, CFG.cellWidth, CFG.cellHeight);
    this.drawBorder(solid);
  }

  drawBorder(solid = false) {
    this.context.beginPath();
    this.context.strokeStyle = solid ? '#41b241' : '#44a147';
    this.context.moveTo(this.top - 0.5, this.left - 0.5);
    this.context.lineTo(this.top - 0.5, this.left + 100 - 0.5);
    this.context.lineTo(this.top + 100 - 0.5, this.left + 100 - 0.5);
    this.context.lineTo(this.top + 100 - 0.5, this.left - 0.5);
    this.context.lineTo(this.top - 0.5, this.left - 0.5);
    this.context.stroke();
  }
}