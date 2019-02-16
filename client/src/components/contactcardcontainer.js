import React, {Component} from 'react';
import ContactCard from './contactcard';

class ContactCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }
    
    async componentWillMount() {
        await this.getCards();
        window.App.addEventListener('reset-contact-card-container', this.getCards, this);
        window.App.addEventListener('remove-contact-card', this.removeCard, this);
        this.updateInterval = setInterval(() => window.App.emitEvent('reset-contact-card-container'), 10000);
    }
    
    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }
    
    async getCards() {
        await fetch(`${this.props.server}/get-cards`).then(async (data) => {
            const cards = await data.json();
            this.setState({
                cards: []
            });
            this.setState({
                cards
            });
        });
    }
    
    async removeCard(id) {
        await fetch(`${this.props.server}/remove-card`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: id})})
            .then((res) => {
                window.App.emitEvent('reset-contact-card-container');
                return res.json();
            })
            .catch((e) => console.error(e));
    }
    
    render() {
        return (
            <div> { this.state.cards.map((card, i) => <ContactCard data={card} key={i}/>) } </div>
        )
    }
}

export default ContactCardContainer;
