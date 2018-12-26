import Unit from './components/unit';
import Map from './components/map';
import Cell from './components/Cell';
import bresenhame from '../../../common/bresenhame';
import {EventEmitter} from './service';

export default (params) => {
  const c1 = Cell.newCell(0, 0);
  const c2 = Cell.newCell(0, 1);
  const c3 = Cell.newCell(0, 2);

  c1.addNewUnit('blue');
  c2.addNewUnit('red');
  c3.addNewUnit('blue');

  Cell.setBallInCell(c1);

  c1.kickBallToCell(c3);
  console.log(Cell.getBall());
  // const mapGame = new Map();

  // Добавим юнита на поле
  /** @type Cell */
  // const cell = mapGame.cellList[2][2];
  // cell.createAddUnit('Ivan');


};