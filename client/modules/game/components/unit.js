import {CFG} from '../cfg';

export default class Unit {
  constructor(name, cell) {
    this.name = name;
    /** @type Cell */
    this.cell = cell;
    this.setPositionByCell(cell);
  }

  setPositionByCell(cell) {
    this.x = cell.left+CFG.cellWidth/4;
    this.y = cell.top+CFG.cellWidth/4;
    this.w = CFG.cellWidth/2;
    this.h = CFG.cellHeight/2;
    this.context = cell.context;
  }

  render() {
    this._renderImg();
  }

  _renderImg() {
    let yy = this.cell.left;
    let xx = this.cell.top;

    const img = new Image();
    img.src = 'https://banner2.kisspng.com/20180713/xkr/kisspng-team-sport-football-player-lucas-hernandez-5b49736c91ec10.8388072915315403325977.jpg';
    img.onload = () => {
      this.context.drawImage(img, this.x, this.y, this.w, this.h);
    }
  }

  drawBorder() {
    this.context.beginPath();
    this.context.strokeStyle = '#ff6200';
    this.context.moveTo(this.x - 1, this.y - 1);
    this.context.lineTo(this.x - 1, this.y + this.h - 1);
    this.context.lineTo(this.x + this.w - 1, this.y + this.h - 1);
    this.context.lineTo(this.x + this.w - 1, this.y - 1);
    this.context.lineTo(this.x - 1, this.y - 1);
    this.context.stroke();
  }

}