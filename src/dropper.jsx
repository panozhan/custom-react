import React from './react';
class Dropper extends React.Component {
    constructor (props) {
        super(props);
    }

    getLeftValue() {
        return 20 + this.props.columnHovered * 100;
    }

    render() {
        return <div id="piece-dropper">
            <div id="piece" 
                style={{left: `${this.getLeftValue()}px`}}
                className={this.props.colorClass}></div>
        </div>
    }
}

export default Dropper;