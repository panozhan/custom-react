import React from './react';
import Column from './column.jsx';
import Dropper from './dropper.jsx';
import {PLAYER} from './constants';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: this.getEmptyBoard(),
            columnHovered: 0,
            player: PLAYER.ONE,
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
                player: state.player === PLAYER.ONE? PLAYER.TWO : PLAYER.ONE
            }
        });
    }

    onMouseEnter(columnId) {
        this.setState({
            columnHovered: columnId
        });
    }

    render() {
        return <div id="game-wrapper">
            <Dropper colorClass={this.state.player === PLAYER.ONE? 'player-one-tile' : 'player-two-tile'} 
                columnHovered={this.state.columnHovered}/>
            <div id="board">
                {
                    this.state.tiles.map((e, index) => {
                        return <Column 
                            onColumnClicked={this.onColumnClicked.bind(this)}
                            onMouseEnter={this.onMouseEnter.bind(this)}
                            values={e}
                            columnId={index}
                            key={index.toString()}>
                        </Column>
                    })
                }
            </div>
            
        </div>
    }
}

export default Game;