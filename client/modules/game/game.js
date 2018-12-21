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


  let target = mapGame.canvas;

  let observer = new MutationObserver(() => {
    let width = target.width;
    let height = target.height;
    CFG.width = width;
    CFG.height = height;
    CFG.cellWidth = width / CFG.cellWidth;
    CFG.cellHeight = height / CFG.cellHeight;
    console.log('asdasdasdasd', CFG);
    mapGame.render();
  });

  observer.observe(target, { attributes: true, subtree: true });

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
    const x = event.offsetX === undefined ? event.layerX : event.offsetX;
    const y = event.offsetY === undefined ? event.layerY : event.offsetY;

    const col = Math.floor(x / CFG.cellWidth);
    const row = Math.floor(y / CFG.cellHeight);
    return mapGame.getCanvasCellByPosition(row, col);
  }

};