const Game = require('./game.js').default;
const React = require('./react');

function initApplication() {
    const root = React.createRoot(document.getElementById('game'));
    root.render(React.createElement(Game, {rows:8, columns:10}));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApplication();
}