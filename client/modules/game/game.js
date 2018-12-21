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
  let mouseCellId;

  mapGame.canvas.addEventListener('mousedown', (event) => {
    /** @type Cell */
    const cell = getCellByMouseEvent(event);

    if (selectCell) { // есть выбранная ячейка
      Cell.movementElementToCell(selectCell, cell, 'unit');
      selectCell = null;
      mapGame.render();
      cell.change();
    } else { // выбрана ячейка
      if (typeof cell.data.unit !== 'undefined') {
        cell.change();
        selectCell = cell;
      }
    }
  });

  mapGame.canvas.addEventListener('mousemove', (event) => {
    /** @type Cell */
    const cell = getCellByMouseEvent(event);

    if (selectCell) {
      if (mouseCellId !== cell.id) {
        mouseCellId = cell.id;
        const cellPoints = bresenhame(selectCell.colIndex, selectCell.rowIndex, cell.colIndex, cell.rowIndex);
        mapGame.render();
        cellPoints.forEach((point) => {
          const cellTemp = mapGame.cellList[point.y][point.x];
          cellTemp.change();
        });
      }
    }

    if(!selectCell) {
      if (mouseCellId !== cell.id) {
        mapGame.render();
        mouseCellId = cell.id;

        cell.change();
      }
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