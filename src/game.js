import React from './react';
import Column from './column.js';
import Dropper from './dropper.js';
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
  onColumnClicked(columnId) {
    this.setState(state => {
      const copiedTiles = state.tiles.map(e => [...e]);
      for (let i = copiedTiles[columnId].length - 1; i >= 0; --i) {
        if (copiedTiles[columnId][i] === 0) {
          copiedTiles[columnId][i] = state.player;
          break;
        }
      }
      return {
        tiles: copiedTiles,
        player: state.player === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE
      };
    });
    console.log('clicked', this.state);
  }
  onMouseEnter(columnId) {
    this.setState({
      columnHovered: columnId
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "game-wrapper"
    }, /*#__PURE__*/React.createElement(Dropper, {
      colorClass: this.state.player === PLAYER.ONE ? 'player-one-tile' : 'player-two-tile',
      columnHovered: this.state.columnHovered
    }), /*#__PURE__*/React.createElement("div", {
      id: "board"
    }, this.state.tiles.map((e, index) => {
      return /*#__PURE__*/React.createElement(Column, {
        onColumnClicked: this.onColumnClicked.bind(this),
        onMouseEnter: this.onMouseEnter.bind(this),
        values: e,
        columnId: index,
        key: index.toString()
      });
    })));
  }
}
export default Game;
