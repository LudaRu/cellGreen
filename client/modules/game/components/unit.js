import Cell from './cell';

export default class Unit {
  constructor(isTeamLeft, xI, yI) {
    this.teamLeft = isTeamLeft; // Левая команда
    this.role = '1';
    this.param = {
      maxProtection: 10,
      maxAttack: 10,
    };

    if (xI !== undefined && yI !== undefined) {
      this.xI = xI;
      this.yI = yI;
    }
  }

  getRndAttack() {
    return Math.floor(Math.random() * this.param.maxAttack) + 1;
  }

  getRndProtection() {
    return Math.floor(Math.random() * this.param.maxProtection) + 1;
  }

}