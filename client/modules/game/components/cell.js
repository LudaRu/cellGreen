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

    // fixme
    this.data = {};
    this.state = {};
    this.state.change = false;
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

    if(this.state.change) {
      this.data.unit.drawBorder()
    }

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

  createAddUnit(name) {
    this.data.unit = new Unit(name, this);
    this.renderData();
  }

  set unit(unit) {
    this.data.unit = unit;
  }

  get unit() {
    return this.data.unit;
  }

  static movementElementToCell(fromCell, toCell, nameElement) {
    if(fromCell.id !== toCell.id){
      toCell.data[nameElement] = fromCell.data[nameElement];
      toCell.data[nameElement].setPositionByCell(toCell);
      delete fromCell.data[nameElement];

      fromCell.render();
      toCell.render();
    }
  }
}