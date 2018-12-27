import Unit from './unit';
import {Config} from '../service';
import bresenhame from '../../../../common/bresenhame';


export default class Cell {
  constructor(xI, yI) {
    this.xI = xI;
    this.yI = yI;
    /** @type Unit */
    this.unit = undefined;
  }

  static addNewUnitToCell(cell, command) {
    if(!Cell.hasUnitInCell(cell)) {
      cell.unit = new Unit(command, this);
    }
  }

  // В ячейке есть игрок
  static hasUnitInCell(cell) {
    if(cell.unit) {
      return true;
    }
  }

  // СТАТИКА

  // мяч
  static setBallInCell(cell) {
    return this.ball = {
      cell: cell,
      xI: cell.xI,
      yI: cell.yI,
    };
  }

  static getBall() {
    return this.ball;
  }


  // Работа со списком ячеек
  static newCell(xI, yI) {
    if (xI <= Config.MAX_COL && yI <= Config.MAX_ROW) {
      if (this.cellList === undefined) {
        this.cellList = {};
      }

      this.cellList[xI] = (this.cellList[xI] !== undefined) ? this.cellList[xI] : this.cellList[xI] = {};
      this.cellList[xI][yI] = (this.cellList[xI][yI] !== undefined) ? this.cellList[xI][yI] : this.cellList[xI][yI] = {};

      const cell = new Cell(xI, yI);
      this.cellList[xI][yI] = cell;
      return cell;
    }
  }


  static getCellByXY(xI, yI) {
      return this.cellList[xI][yI];
  }

  static xyInConfig(xI, yI) {
    if (xI <= Config.MAX_COL && yI <= Config.MAX_ROW && xI > 0 && yI > 0) {
      return true;
    }
  }

  static hasCelByXY(xI, yI) {
    if (Cell.xyInConfig(xI, yI)) {
      if (this.cellList[xI] !== undefined) {
        if (this.cellList[xI][yI] !== undefined) {
          return true;
        }
      }
    }
    return false;
  }
}