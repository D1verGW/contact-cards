import React, {Component} from 'react';

class ContactCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            _id: '',
            className: 'contactCard row mx-0 my-2 d-flex align-items-center border border-secondary rounded p-2'
        };
    }
    
    componentWillMount() {
        this.setState({
            ...this.props.data
        });
    }
    
    componentWillUnmount() {
    
    }
    
    deleteCard() {
        window.App.emitEvent('remove-contact-card', this.state._id)
    }
    
    render() {
        return (
            <div className={this.state.className}>
                <div
                    className='col-12 col-sm-3 my-1 my-sm-0 first-name'>{this.state.firstName}</div>
                <div
                    className='col-12 col-sm-3 my-1 my-sm-0 last-name'>{this.state.lastName}</div>
                <div
                    className='col-12 col-sm-4 my-1 my-sm-0 phone-number'>{this.state.phoneNumber}</div>
                <button
                    className='col-6 col-sm-2 mx-auto my-4 my-sm-0 btn btn-outline-danger btn-lg'
                    onClick={ () => { this.deleteCard() } }>
                    X
                </button>
            </div>
        )
    }
}

export default ContactCard;