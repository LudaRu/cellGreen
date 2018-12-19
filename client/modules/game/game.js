import Unit from './components/unit';
import Map from './components/map';
import bresenhame from '../../../common/bresenhame';
import {EventEmitter} from './service';
import {CFG} from './cfg';

export default (params) => {
  const mapGame = new Map();
  mapGame.render();

  let selectCell;

  mapGame.canvas.addEventListener('mousedown', (event) => {
    const col = Math.floor(event.layerX / CFG.cellHeight);
    const row = Math.floor(event.layerY / CFG.cellWidth);
  });

  mapGame.canvas.addEventListener('mousemove', (event) => {
    if(selectCell) {
      const col = Math.floor(event.screenX / CFG.cellHeight);
      const row = Math.floor(event.screenY / CFG.cellWidth);

      const togglePoints = bresenhame(0, 0, row, col);
      togglePoints.forEach((v) => {
        /** @type Cell **/
        const cellObj = mapGame.getCanvasCellByPosition(v.x, v.y);
        cellObj.toggle();
      });
    }
  });

  EventEmitter.subscribe('selectCell', (data) => {
    selectCell = data;
  });

  /** @type Cell */
  const f = mapGame.cellList[2][2];
  f.addUnit('Ivan');
  f.renderData();
};