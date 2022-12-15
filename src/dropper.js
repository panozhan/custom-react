import React from './react';
class Dropper extends React.Component {
  constructor(props) {
    super(props);
  }
  getLeftValue() {
    return 20 + this.props.columnHovered * 100;
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "piece-dropper"
    }, /*#__PURE__*/React.createElement("div", {
      id: "piece",
      style: {
        left: `${this.getLeftValue()}px`
      },
      className: this.props.colorClass
    }));
  }
}
export default Dropper;
