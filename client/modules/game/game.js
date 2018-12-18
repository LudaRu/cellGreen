import Map from './map';
import {EventEmitter} from './service'

export default (params) => {
    const mapGame = new Map();
    mapGame.render();

    EventEmitter.subscribe('clickCell', (Cell) => {
        Cell.toggle();
    })
};