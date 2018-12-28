import Unit from './unit';
import {Config} from '../service';
import bresenhame from '../../../../common/bresenhame';


export default class Cell {
  constructor(xI, yI, unit) {
    this.xI = xI;
    this.yI = yI;
    /** @type Unit */
    this.unit = unit;

    // ворота
    if(xI === 1 && yI === 4 || xI === 12 && yI === 4) {
      this.gateway = true;
    }
  }

  // Создание 2-х мерной карты с ячейками
  static generateCellListAndSetnUnit() {
    const cellList = [];
    for (let xI = 1; xI <= Config.MAX_COL; xI++) {
      cellList[xI] = [];
      for (let yI = 1; yI <= Config.MAX_ROW; yI++) {
        cellList[xI][yI] = new Cell(xI, yI);
      }
    }
    return cellList;
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

  static genCellWithTeam(team) {
    // Объединяем левую и парвую команду в одну кучу
    let allUnit = team.teamLeft.concat(team.teamRight);
    const cellList = [];
    for (let xI = 1; xI <= Config.MAX_COL; xI++) {
      cellList[xI] = [];
      for (let yI = 1; yI <= Config.MAX_ROW; yI++) {

        // Ищем игрока в этой клетки
        let unit;
        for (let i = 0; i < allUnit.length; i++) {
          if(allUnit[i].xI === xI && allUnit[i].yI === yI){
            allUnit[i].cell = cellList[xI][yI];
            unit = allUnit[i];
            break;
          }
        }

        cellList[xI][yI] = new Cell(xI, yI, unit);
      }
    }
    return cellList;
  }
}