class Component {
    constructor(props) {
        this.props = props;
    }

    setState(arg) {
        if (typeof arg === 'function') {
            const newState = arg(this.state, this.props);
            this.state = newState;
        } else if (typeof arg === 'object') {
            this.state = arg;
        }
        
        // remember, this.currentElement is a Element (https://developer.mozilla.org/en-US/docs/Web/API/Element)
        this.currentElement.remove();
        this.currentElement = this.getDomElement();
        this.parent.append(this.currentElement);
    }

    getDomElement() {
        const reactElement = this.render();
        let element = document.createElement(this.reactElement.type);   
        if (reactElement.props.id !== undefined) {
            element.id = reactElement.props.id;
        }
        if (reactElement.props.className !== undefined) {
            element.className = reactElement.props.className;
        }
        if (reactElement.props.onClick !== undefined) {
            element.addEventListener('click', reactElement.props.onClick);
        }
        if (reactElement.props.onMouseEnter !== undefined) {
            element.addEventListener('mouseenter', reactElement.props.onMouseEnter);
        }
    }

    firstRender(parent) {
        this.parent = parent;
        this.currentElement = this.render();
        this.parent.append(this.currentElement);
    }
};

class Root {
    constructor(container) {
        this.container = container;
    }

    render(element) {

    }
}

function createRoot(type) {
    return new Root();
}

function createElement(type, props, ...children) {
    return {
        type,
        props,
        children
    };
}

module.exports = {
    Component,
    createRoot,
    createElement,
}