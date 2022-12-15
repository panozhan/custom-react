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

    createElementAndAddProps(reactElement) {
        let element = document.createElement(reactElement.type);   
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
        return element;
    }

    getDomElement() {
        const reactElement = this.render();
        // We assume that the top level element is an HTML type
        // There is no reason for the top level element to ever be a React type
        const result = this.createElementAndAddProps(reactElement);

        for (let child of reactElement.children) {
            if (typeof child.type === 'string') {
                const childDomElement = this.createElementAndAddProps(child);
                result.append(childDomElement);
            } else if (typeof child.type === 'function') {
                const component = new child.type(child.props);
                result.append(component.getDomElement());
            }
        }
        return result;
    }

};

class ReactElement {
    constructor(type, props, ...children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

class Root {
    constructor(container) {
        this.container = container;
    }

    render(element) {
        if (element.type === 'function') {
            const reactElement = new element.type(element.props);
            this.container.append(reactElement.getDomElement());
        } else {
            console.log('top level render must be a react component');
        }
    }
}

function createRoot(type) {
    return new Root();
}

function createElement(type, props, ...children) {
    return new ReactElement(type, props, children);
}

module.exports = {
    Component,
    createRoot,
    createElement,
}