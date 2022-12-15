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
        console.log('create element and add props ', reactElement);
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
    
    // renderArray(array) {
    //     for (let nestedChild of child) {
    //         console.log('array child', child, nestedChild);
    //         appendElement(result, nestedChild);
    //     }
    // }

    // appendElement(parent, reactElement) {

    // }

    renderReactElement(reactElement) {
        console.log('calling render react element ', reactElement);
        // We assume that the top level element is an HTML type
        // There is no reason for the top level element to ever be a React type
        const result = this.createElementAndAddProps(reactElement);

        for (let child of reactElement.children) {
            const appendElement = (parent, reactElement) => {
                console.log('append element called', parent, reactElement);
                if (reactElement instanceof Array) {

                } else if (typeof reactElement.type === 'string') {
                    const childDomElement = this.renderReactElement(reactElement);
                    console.log('inside problem', childDomElement);
                    parent.append(childDomElement);
                } else if (typeof reactElement.type === 'function') {
                    const component = new reactElement.type(reactElement.props);
                    parent.append(component.getDomElement());
                }
            }

            if (child instanceof Array) {
                for (let nestedChild of child) {
                    console.log('array child', child, nestedChild);
                    appendElement(result, nestedChild);
                }
            } else {
                appendElement(result, child);
            }

        }
        return result;
    }

    getDomElement() {
        const reactElement = this.render();
        return this.renderReactElement(reactElement);
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
        if (typeof element.type === 'function') {
            console.log('here')
            const reactElement = new element.type(element.props);
            this.container.append(reactElement.getDomElement());
        } else {
            console.log('top level render must be a react component');
        }
    }
}

function createRoot(container) {
    return new Root(container);
}

function createElement(type, props, ...children) {
    return new ReactElement(type, props, children);
}

module.exports = {
    Component,
    createRoot,
    createElement,
}