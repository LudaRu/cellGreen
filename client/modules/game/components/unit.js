import {CFG} from '../cfg';

export default class Unit {
  constructor(name, cell) {
    this.name = name;
    /** @type Cell */
    this.cell = cell;
    this.img = null;

    const img = new Image();
    img.src = 'https://banner2.kisspng.com/20180713/xkr/kisspng-team-sport-football-player-lucas-hernandez-5b49736c91ec10.8388072915315403325977.jpg';
    this.img = img;
  }

  render() {
    this._renderCircle(this.cell.context);
  }

  _renderCircle(context) {
    let yy = this.cell.left;
    let xx = this.cell.top;

    const img = new Image();
    img.src = 'https://banner2.kisspng.com/20180713/xkr/kisspng-team-sport-football-player-lucas-hernandez-5b49736c91ec10.8388072915315403325977.jpg';

    img.onload = () => {
      context.drawImage(this.img, xx + (CFG.cellWidth/4), yy+(CFG.cellHeight/4), CFG.cellWidth/2, CFG.cellHeight/2);

    }
  }
}