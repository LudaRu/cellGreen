import Cell from './cell';

export default class Unit {
  constructor(command, cell) {
    this.command = command;
    this.cell = cell;
    this.param = {
      protection: 10,
      attack: 5,
    }
  }
}