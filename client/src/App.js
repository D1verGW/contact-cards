import React, {Component} from 'react';
import './App.css';
import AddCard from './components/addcard';
import ContactCardContainer from "./components/contactcardcontainer";

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
// eslint-disable-next-line
const server = 'http://' + location.hostname + ':5000';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {}
        };
        window.App = this;
    }
    
    // use for avoid redux in this project
    addEventListener(eventName, listener, ctx) {
        this.setState({
            events: {
                [eventName]: this.state.events[eventName] ? this.state.events[eventName] : [],
                ...this.state.events
            }
        });
    
        this.state.events[eventName].push([listener, ctx]);
    }
    
    emitEvent(event, ...data) {
        if (!this.state.events[event]) throw Error(`Event ${event} not found in ${ this.state.events }`);
        this.state.events[event].map(([listener, ctx]) => listener.apply(ctx, data));
    }
    
    render() {
        return (
            <div className="App container col-12 h-100">
                <AddCard server={server}/>
                <ContactCardContainer server={server}/>
            </div>
        );
    }
}

export default App;
