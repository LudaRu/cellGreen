import Unit from './components/unit';
import Map from './components/map';
import bresenhame from '../../../common/bresenhame';
import {EventEmitter} from './service';
import {CFG} from './cfg';

export default (params) => {
  const mapGame = new Map();
  mapGame.render();

  /** @type Cell */
  let selectCell;

  mapGame.canvas.addEventListener('mousedown', (event) => {
    /** @type Cell */
    const cell = getCellByMouseEvent(event);

    if(selectCell) {
      cell.movementElementToCell(selectCell, 'unit');
        mapGame.render();
    } else {
      if(typeof cell.data.unit !== 'undefined') {
        selectCell = cell;
        cell.unit.drawBorder();
      }
    }
  });

  mapGame.canvas.addEventListener('mousemove', (event) => {
    /** @type Cell */
    // const cell = getCellByMouseEvent(event);
  });

  EventEmitter.subscribe('selectCell', (data) => {
    selectCell = data;
  });

  /** @type Cell */
  const f = mapGame.cellList[2][2];
  f.createUnit('Ivan');
  f.renderData();

  function getCellByMouseEvent(event) {
    const col = Math.floor(event.layerX / CFG.cellWidth);
    const row = Math.floor(event.layerY / CFG.cellHeight);
    return mapGame.getCanvasCellByPosition(row, col);
  }

};