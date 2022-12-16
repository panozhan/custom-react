import React from './react';
import Column from './column.js';
import { PLAYER } from './constants';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.getEmptyBoard(),
      columnHovered: 0,
      player: PLAYER.ONE
    };
  }

  getEmptyBoard() {
    const tiles = [];
    for (let i = 0; i < this.props.columns; ++i) {
      const column = [];
      for (let j = 0; j < this.props.rows; ++j) {
        column.push(PLAYER.NONE);
      }
      tiles.push(column);
    }
    return tiles;
  }

  render() {
    // FILL This IN
  }
}
export default Game;