import React from './react';
import { PLAYER } from './constants';
class Column extends React.Component {
  constructor(props) {
    super(props);
    this.columnId = props.columnId;
  }
  handleClicked() {
    this.props.onColumnClicked(this.columnId);
  }
  handleMouseEnter() {
    this.props.onMouseEnter(this.columnId);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "column",
      onClick: this.handleClicked.bind(this),
      onMouseEnter: this.handleMouseEnter.bind(this)
    }, this.props.values.map((e, index) => {
      const classList = ['innerTile'];
      if (e === PLAYER.ONE) {
        classList.push('player-one-tile');
      } else if (e === PLAYER.TWO) {
        classList.push('player-two-tile');
      }
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "tile"
      }, /*#__PURE__*/React.createElement("div", {
        className: classList.join(' ')
      }));
    }));
  }
}
export default Column;
