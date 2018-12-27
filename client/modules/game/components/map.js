import Cell from './Cell';
import {Config} from '../service';
import bresenhame from '../../../../common/bresenhame';

export default class Map {
  constructor() {
    this.cellList = this._generateCells();
    // ставим мяч в центре левой команды

    // Установка ворот
    this.cellList[1][4].gateway = true;
    this.cellList[12][4].gateway = true;

    // Растановка игроков
    Cell.addNewUnitToCell(this.cellList[6][4], 'blue');
    Cell.addNewUnitToCell(this.cellList[5][2], 'blue');
    Cell.addNewUnitToCell(this.cellList[5][4], 'blue');
    Cell.addNewUnitToCell(this.cellList[3][4], 'blue');
    Cell.addNewUnitToCell(this.cellList[1][4], 'blue'); // Вратарь

    Cell.addNewUnitToCell(this.cellList[7][1], 'red');
    Cell.addNewUnitToCell(this.cellList[7][2], 'red');
    Cell.addNewUnitToCell(this.cellList[7][3], 'red');
    Cell.addNewUnitToCell(this.cellList[7][4], 'red');
    Cell.addNewUnitToCell(this.cellList[12][4], 'red'); // Вратарь

    this.ball = {
      cell: this.cellList[6][4],
      xI: this.cellList[6][4].xI,
      yI: this.cellList[6][4].yI,
    };
    Map.rendeMap(this);
    this.kickBallToCell(this.cellList[12][4]); // Пнём мяч вратарю
    Map.rendeMap(this);

  }

  kickBallToCell(toCell){
    /** @type Cell */
    const fromCell = this.ball.cell;
    if(fromCell.unit) { // Есть игрок в клетке

      // очко атакующего
      const attackScore = fromCell.unit.getRndAttack();

      let endProtectionCell = 0; // ячейка с максимальным очком защ.
      let maxProtectionScore = 0; // максимальное очком защ.

      const points = bresenhame(this.ball.cell.xI, this.ball.cell.yI, toCell.xI, toCell.yI);

      points.forEach((point) => {
        const cellInPoint = this.cellList[point.x][point.y];
        // Выбираем только врагов
        if (cellInPoint.unit && cellInPoint.unit.command !== this.ball.cell.unit.command) {
          const protectionScore = cellInPoint.unit.getRndProtection();
          // Враг перехватил мяч
          if (attackScore <= protectionScore) {
            maxProtectionScore = protectionScore;
          }

          endProtectionCell = cellInPoint;
        }
      });

      if (attackScore > maxProtectionScore) { // Попал
        if(endProtectionCell){
          if(endProtectionCell.gateway) { // Если это ворота врага
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

  // мяч
  setBallInCell(cell) {
    return this.ball = {
      cell: cell,
      xI: cell.xI,
      yI: cell.yI,
    };
  }

  // Создание 2-х мерной карты с ячейками
  _generateCells() {
    const cellList = [];
    for (let xI = 1; xI <= Config.MAX_COL; xI++) {
      cellList[xI] = [];
      for (let yI = 1; yI <= Config.MAX_ROW; yI++) {
        cellList[xI][yI] = new Cell(xI, yI);
      }
    }
    return cellList;
  }

  static rendeMap(map){
    let str = "";
    if(!map.cellList) {
      console.log('ГОЛ!!!!');
      return;
    }

    map.cellList.forEach((y) => {
      y.forEach(cell => {
        if(cell.unit){
          if(cell.unit.command === 'red') {
            str += 'X';
          }else {
            str += 'Y';
          }

        }
        else {
          str += '|';
        }
        if(map.ball.cell === cell){
          str += 'o';
        } else {
          str += ' ';
        }
      })
      str += "\n";
    });

    console.log(str)
  }

}