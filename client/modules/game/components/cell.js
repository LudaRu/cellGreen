import {CFG} from '../cfg';
import Unit from './unit';

export default class Cell {
  constructor(colI, rowI, solid, context) {
    // Индексы в массиве объектов
    this.id = rowI + '' + colI;
    this.rowIndex = rowI;
    this.colIndex = colI;
    this.context = context;

    this.top = colI * CFG.cellWidth; // Позиция x
    this.left = rowI * CFG.cellHeight; // Позиция y
    this.solid = solid; // Выделение ячейки

    this.data = {};
  }

  toggle() {
    this.solid = !this.solid;
    this.render();
  }

  render() {
    this.context.fillStyle = this.solid ? '#63e269' : '#4CAF50';
    this.context.fillRect(this.top, this.left, CFG.cellWidth, CFG.cellHeight);
    this._drawBorder();
    this.renderData();
  }

  renderData() {
    if(this.data.unit){
      this.data.unit.render();
    }
  }

  _drawBorder() {
    this.context.beginPath();
    this.context.strokeStyle = this.solid ? '#41b241' : '#44a147';
    this.context.moveTo(this.top - 0.5, this.left - 0.5);
    this.context.lineTo(this.top - 0.5, this.left + 100 - 0.5);
    this.context.lineTo(this.top + 100 - 0.5, this.left + 100 - 0.5);
    this.context.lineTo(this.top + 100 - 0.5, this.left - 0.5);
    this.context.lineTo(this.top - 0.5, this.left - 0.5);
    this.context.stroke();
  }

  createUnit(name) {
    this.data.unit = new Unit(name, this);
  }

  deleteUnit() {
    delete this.data.unit;
  }

  set unit(unit) {
    this.data.unit = unit;
  }

  get unit() {
    return this.data.unit;
  }

  movementElementToCell(newCell, nameElement) {
    newCell.data[nameElement] = this.data[nameElement];
    delete this.data[nameElement];

    newCell.render();
    this.render();
  }
}