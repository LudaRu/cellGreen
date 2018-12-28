import Unit from './components/unit';
import Map from './components/map';
import Cell from './components/Cell';
import bresenhame from '../../../common/bresenhame';
import {EventEmitter} from './service';
import {Game} from './service';
import {Config} from './service';
import Ball from './components/ball';

export default (params) => {

  // инит
  Game.map = new Map();
  Game.teamList = {
    teamLeft: createTeamLeft(),
    teamRight: createTeamRight(),
  };
  // Создаем ячейки с игроками внутри
  Game.cellList = Cell.genCellWithTeam(Game.teamList);

  Game.ball = new Ball();
  // У нас есть установленные игроки и мяч, Все разделены на команды

  Map.rendeMap(Game.map);
  Map.movementUnitFromToCell(Game.cellList[6][5], Game.cellList[1][1]);
  Map.rendeMap(Game.map);

  function createTeamLeft() {
    return [
      new Unit(true, 6, 3),
      new Unit(true, 6, 4),
      new Unit(true, 6, 5),
      new Unit(true, 9, 6),
      new Unit(true, 1, 4), // вратарь
    ];
  }

  function createTeamRight() {
    return [
      new Unit(false, 7, 3),
      new Unit(false, 7, 4),
      new Unit(false, 7, 5),
      new Unit(false, 12, 4), // вратарь
    ];
  }
};

//////////////////////|xI,yI|//////////////////////
//                                               //
//  | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 | 1,7 |  //
//                                               //
//  | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 | 2,7 |  /
//                                               L
//  | 3,1 | 3,2 | 3,3 | 3,4 | 1,5 | 3,6 | 3,7 |  E
//                                               F
//  | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 | 4,7 |  T
//                                               /
//  | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 | 5,7 |  //
//                                               //
//  | 6,1 | 6,2 | 6,3 | 6,4 | 6,5 | 6,6 | 6,7 |  //
//-----------------------+-----------------------//
//  | 7,1 | 7,2 | 7,3 | 7,4 | 7,5 | 7,6 | 7,7 |  //
//                                               //
//  | 8,1 | 8,2 | 8,3 | 8,4 | 8,5 | 8,6 | 8,7 |  /
//                                               R
//  | 9,1 | 9,2 | 9,3 | 9,4 | 9,5 | 9,6 | 9,7 |  I
//                                               G
//  | 10,1| 10,2| 10,3| 10,4| 10,5| 10,6| 10,7|  H
//                                               T
//  | 11,1| 11,2| 11,3| 11,4| 11,5| 11,6| 11,7|  /
//                                               //
//  | 12,1| 12,2| 12,3| 12,4| 12,5| 12,6| 12,7|  //
//                                               //
///////////////////////////////////////////////////