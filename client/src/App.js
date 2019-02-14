import React, { Component } from 'react';
import './App.css';
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
// eslint-disable-next-line
const server = 'http://' + location.hostname + ':5000';


class contactCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: ''
        };

        this.props = props;
    }

    componendDidMount() {
        this.setState({
            ...this.props
        });
    }

    deleteCard() {

    }

    render() {
        return (
            <div className={'contactCard'}>
                <span className={'firstname'}>{ this.state.firstName }</span>
                <span className={'lastname'}>{ this.state.lastName }</span>
                <span className={'phone'}>{ this.state.phone }</span>
                <button className={'delbtn'} onClick={ () => { this.deleteCard() } }>X</button>
            </div>
        )
    }
}

class addCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: ''
        };

        this.props = props;
    }

    componendDidMount() {
        console.log('123');
        this.setState({
            ...this.props
        });
    }

    saveCard() {

    }

    render() {
        return (
            <div className={'contactCard'}>
                <span className={'firstname'}>{ this.state.firstName }</span>
                <span className={'lastname'}>{ this.state.lastName }</span>
                <span className={'phone'}>{ this.state.phone }</span>
                <button className={'delbtn'} onClick={ () => { this.deleteCard() } }>X</button>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactCards: []
        };
    }

    async componentDidMount() {
        let cards = await this.getCards();
        console.log(cards);
        this.setState({
            contactCards: cards.map((card, index) => {
                return <contactCard data={card} key={index}></contactCard>
            })
        })
    }

    async getCards() {
        return await fetch(`${server}/get-cards`).then((data) => {
            return data.json();
        });
    }

    showAddCardModal() {
        fetch(`${server}`);
    }

    render() {
        return (
            <div className="App container col-12 h-100">
                <button type='button' className={ 'btn btn-primary' } onClick={ () => { this.showAddCardModal() } }>
                    Add contact card
                </button>
                {
                    this.state.cards
                }
            </div>
        );
    }
}

export default App;
