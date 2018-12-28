import Cell from './Cell';
import {Config, Game} from '../service';
import bresenhame from '../../../../common/bresenhame';

export default class Map {
  constructor() {
  }

  kickBallToCell(toCell) {
    /** @type Cell */
    const fromCell = this.ball.cell;
    if (fromCell.unit) { // Есть игрок в клетке

      // очко атакующего
      const attackScore = fromCell.unit.getRndAttack();

      let endProtectionCell = undefined; // ячейка с максимальным очком защ.
      let maxProtectionScore = 0; // максимальное очком защ.

      const points = bresenhame(this.ball.cell.xI, this.ball.cell.yI, toCell.xI, toCell.yI);


      for (let i = 0; i < points.length; i++) {
        const cellInPoint = this.cellList[points[i].x][points[i].y];
        // Выбираем только врагов
        if (cellInPoint.unit && cellInPoint.unit.command !== this.ball.cell.unit.command) {
          const protectionScore = cellInPoint.unit.getRndProtection();
          // Враг перехватил мяч
          if (attackScore <= protectionScore) {
            maxProtectionScore = protectionScore;
            endProtectionCell = cellInPoint;
            break;
          }
        }
      }


      if (attackScore > maxProtectionScore) { // Попал
        if (endProtectionCell) {
          if (endProtectionCell.gateway) { // Если это ворота врага
            this.cellList = false;
          } else {
            this.setBallInCell(toCell);
          }
        }

      } else { // Перехватил враг
        this.setBallInCell(endProtectionCell);
      }

    }
  }

  // Перенести игрока в другую клетку
  static movementUnitFromToCell(fromCell, toCell) {
    const unit = fromCell.unit;
    delete fromCell.unit; // Удалим игрока из старой клетки
    unit.xI = toCell.xI;
    unit.yI = toCell.yI;
    toCell.unit = unit; // Переносим в новую клетку
  }

  static rendeMap(map) {
    let str = '';
    if (!Game.cellList) {
      console.log('ГОЛ!!!!');
      return;
    }

    Game.cellList.forEach((y) => {
      y.forEach(cell => {
        if (cell.unit) {
          if (cell.unit.teamLeft) {
            str += 'X';
          } else {
            str += 'Y';
          }

        }
        else {
          str += '|';
        }
        if (Game.ball.cell === cell) {
          str += 'o';
        } else {
          str += ' ';
        }
      });
      str += '\n';
    });

    console.log(str);
  }

}