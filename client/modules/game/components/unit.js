import Cell from './cell';

export default class Unit {
  constructor(command, cell) {
    this.command = command;
    this.cell = cell;
    this.param = {
      maxProtection: 10,
      maxAttack: 10,
    }
  }

  getRndAttack() {
    return Math.floor(Math.random() * this.param.maxAttack) + 1
  }

  getRndProtection() {
    return Math.floor(Math.random() * this.param.maxProtection) + 1
  }

}