class Component {
    constructor(props) {
        this.props = props;
    }

    setState(arg) {
        if (typeof arg === 'function') {
            const newState = arg(this.state, this.props);
            for (let prop in newState) {
                if (this.state.hasOwnProperty(prop)) {
                   this.state[prop] = newState[prop]; 
                }
            }
            this.state = newState;
        } else if (typeof arg === 'object') {
            for (let prop in arg) {
                if (this.state.hasOwnProperty(prop)) {
                   this.state[prop] = arg[prop]; 
                }
            }
        }
        
        // remember, this.currentElement is a Element (https://developer.mozilla.org/en-US/docs/Web/API/Element)
        const parent = this.currentElement.parentElement;
        this.currentElement.remove();
        this.currentElement = Component.renderHtmlElement(this.render());
        parent.append(this.currentElement);
    }

    static renderHtmlElement(element) {
        if (!(element instanceof ReactElement)) {
            console.log(`Error: we encountered an item that is not an object created using React.CreateElement ${item}`);
            return null;
        }
        let result = document.createElement(element.type);   
        if (element.props.id !== undefined) {
            result.id = element.props.id;
        }
        if (element.props.className !== undefined) {
            result.className = element.props.className;
        }
        if (element.props.onMouseEnter !== undefined) {
            result.addEventListener('mouseenter', element.props.onMouseEnter);
        }
        if (element.props.style !== undefined ) {
            const styles = element.props.style;
            if (styles.left !== undefined) {
                result.style.left = styles.left;
            }
        }
        if (element.children.length !== 0) {
            Component.processChildren(element, result);
        }
        return result;
    }

    static renderGenericItem(item) {
        if (item instanceof Array) {
            return Component.renderReactArray(item);
        } else if (item instanceof ReactElement) {
            if (typeof item.type === 'string') {
                return Component.renderHtmlElement(item);
            } else if (typeof item.type === 'function') {
                return Component.renderReactElement(item);
            } else {
                console.log(`Error: we encountered a ReactElement whose type is neither a string nor function`, item);
                return null;
            }
        } else {
            console.log(`Error: we encountered an item that is neither an array nor an object created using React.CreateElement`, item);
            return null;
        }
    }
    
    static renderReactArray(array) {
        let result = [];
        for (let item of array) {
            const transformedItem = Component.renderGenericItem(item);
            if (transformedItem !== null) {
                if (transformedItem instanceof Array) {
                    result = result.concat(transformedItem);
                } else {
                    result.push(transformedItem);
                }
            }
        }
        return result;
    }

    static processChildren(element, parent) {
        if (element.children.length !== 0) {
            for (let domElement of Component.renderReactArray(element.children)) {
                parent.append(domElement);
            }
        }
    }

    static renderReactElement(reactElement) {
        // We assume that the top level element is an HTML element
        // There is no reason for the top level element to ever be a React type
        const component = new reactElement.type(reactElement.props);
        const componentReactElement = component.render();
        const result = Component.renderHtmlElement(componentReactElement);
        component.currentElement = result;
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
        if (typeof element.type === 'function') {
            this.container.append(Component.renderReactElement(element));
        } else {
            console.log('Error: top level render must be a react component');
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