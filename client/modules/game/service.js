import eventEmitter from '../../../common/EventEmitter';

export const EventEmitter = new eventEmitter();

export const Game = {
  map: {},
  ball: {},
  cellList: {},
  teamList: {
    teamLeft: [],
    teamRight: [],
  },
};
export const Config = {
  MAX_COL: 12,
  MAX_ROW: 7,
};