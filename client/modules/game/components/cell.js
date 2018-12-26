import Unit from './unit';
import {Config} from '../service';
import bresenhame from '../../../../common/bresenhame';


export default class Cell {
  constructor(xI, yI) {
    this.xI = xI;
    this.yI = yI;
    this.unit = undefined;
  }

  addNewUnit(command) {
    this.unit = new Unit(command, this);
  }

  kickBallToCell(cell) {
    // Мяч внутри этой ячейки
    if (Cell.ball.cell === this) {

      // очко атаки
      const attackScore = Math.floor(Math.random() * this.unit.param.attack) + 1;

      let maxProtectionCell = null; // ячейка с максимальным очком защ.
      let maxProtectionScore = null; // максимальное очком защ.

      const points = bresenhame(this.xI, this.yI, cell.xI, cell.yI);
      points.forEach((point) => {
        const cellInPoint = Cell.getCellByXY(point.x, point.y);

        // Выбираем только союзников
        if (cellInPoint.unit.command !== this.unit.command) {
          const protectionScore = Math.floor(Math.random() * cellInPoint.unit.param.protection) + 1;

          if (maxProtectionCell && protectionScore <= maxProtectionCell) {
            return;// выпало число меньше чем предыдущее
          }
          maxProtectionCell = cellInPoint;
          maxProtectionScore = protectionScore;
        }
      });

      console.info('attack', attackScore, 'prot', maxProtectionScore);
      if (attackScore > maxProtectionScore) {
        Cell.setBallInCell(cell);
        // return cell; // Вернем союзника
      } else {
        Cell.setBallInCell(maxProtectionCell);
        // return maxProtectionCell; // вернем поймавшего врага
      }
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

  static getCellList() {
    return this.cellList;
  }

  static getCellByXY(xI, yI) {
    if (Cell.hasCelByXY(xI, yI)) {
      return this.cellList[xI][yI];
    }
  }

  static deleteCellByXY(xI, yI) {
    if (Cell.hasCelByXY(xI, yI)) {
      delete this.cellList[xI][yI];
    }
  }

  static hasCelByXY(xI, yI) {
    if (xI <= Config.MAX_COL && yI <= Config.MAX_ROW) {
      if (this.cellList[xI] !== undefined) {
        if (this.cellList[xI][yI] !== undefined) {
          return true;
        }
      }
    }
    return false;
  }
}