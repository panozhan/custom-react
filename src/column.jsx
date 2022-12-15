import React from './react';
import {PLAYER} from './constants';

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
        return <div className="column" 
                onClick={this.handleClicked.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}>
            {this.props.values.map((e, index) => {
                const classList = ['innerTile'];
                if (e === PLAYER.ONE) {
                    classList.push('player-one-tile');
                } else if (e === PLAYER.TWO) {
                    classList.push('player-two-tile');
                }
                return <div key={index} className='tile'>
                    <div className={classList.join(' ')}></div>
                </div>
            })}
        </div>;
    }
}

export default Column; 