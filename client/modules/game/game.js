import Unit from './components/unit';
import Map from './components/map';
import Cell from './components/Cell';
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

    if (selectCell) {
      Cell.movementElementToCell(selectCell, cell, 'unit');
      selectCell = null;
    } else {
      if (typeof cell.data.unit !== 'undefined') {
        selectCell = cell;
        cell.unit.drawBorder();
      }
    }
  });

  mapGame.canvas.addEventListener('mousemove', (event) => {
    if(selectCell) {
      /** @type Cell */
      const cell = getCellByMouseEvent(event);
      const cellPoints = bresenhame(selectCell.colIndex, selectCell.rowIndex, cell.colIndex, cell.rowIndex);
      cellPoints.forEach((point) => {
        const cellTemp = mapGame.cellList[point.y][point.x];
        cellTemp.toggle();
      });
    }
  });

  // EventEmitter.subscribe('selectCell', (data) => {
  //   selectCell = data;
  // });

  // Добавим юнита на поле
  /** @type Cell */
  const cell = mapGame.cellList[2][2];
  cell.createAddUnit('Ivan');

  function getCellByMouseEvent(event) {
    const col = Math.floor(event.layerX / CFG.cellWidth);
    const row = Math.floor(event.layerY / CFG.cellHeight);
    return mapGame.getCanvasCellByPosition(row, col);
  }

};