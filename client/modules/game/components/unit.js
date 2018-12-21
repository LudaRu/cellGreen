import {CFG} from '../cfg';

export default class Unit {
  constructor(name, cell) {
    this.name = name;
    /** @type Cell */
    this.setPositionByCell(cell);
    this.img =new Image();
    this.img.src = 'https://banner2.kisspng.com/20180713/xkr/kisspng-team-sport-football-player-lucas-hernandez-5b49736c91ec10.8388072915315403325977.jpg';
  }

  setPositionByCell(cell) {
    this.x = cell.top + CFG.cellWidth / 4;
    this.y = cell.left + CFG.cellWidth / 4;
    this.w = CFG.cellWidth / 2;
    this.h = CFG.cellHeight / 2;
    this.context = cell.context;
  }

  render() {
    this._renderImg();
  }

  _renderImg() {
    if(!this.img.onload){
      this.img.onload = () => {
        this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
      };
    }

    this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}