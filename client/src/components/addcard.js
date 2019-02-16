import React, {Component} from 'react';

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: ''
        };
    }
    
    componentDidMount() {
    
    }
    
    async saveCard() {
        await fetch(`${this.props.server}/add-card`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...this.state})})
            .then((res) => {
                window.App.emitEvent('reset-contact-card-container');
                this.setState({
                    firstName: '',
                    lastName: '',
                    phoneNumber: ''
                });
                return res.json();
            })
            .catch((e) => console.error(e));
    }
    
    update = (name, e) => {
        this.setState({[name]: e.target.value});
    }
    
    render() {
        return (
            <div>
                <div className='row mx-0 my-2'>
                    <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal"
                            data-target="#exampleModal">
                        Add contact card
                    </button>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="contactCard modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add contact card</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group input-group-sm my-1">
                                    <div className="input-group-prepend col-4 px-0">
                                        <span className="input-group-text w-100"
                                              id="inputGroup-sizing-lg">First name</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Large"
                                           aria-describedby="inputGroup-sizing-sm"
                                           onChange={(e) => this.update("firstName", e)}/>
                                </div>
                                <div className="input-group input-group-sm my-1">
                                    <div className="input-group-prepend col-4 px-0">
                                        <span className="input-group-text w-100"
                                              id="inputGroup-sizing-lg">Last name</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Large"
                                           aria-describedby="inputGroup-sizing-sm"
                                           onChange={(e) => this.update("lastName", e)}/>
                                </div>
                                <div className="input-group input-group-sm my-1">
                                    <div className="input-group-prepend col-4 px-0">
                                        <span className="input-group-text w-100"
                                              id="inputGroup-sizing-lg">Phone number</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Large"
                                           aria-describedby="inputGroup-sizing-sm"
                                           onChange={(e) => this.update("phoneNumber", e)}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                                    this.saveCard()
                                }}>Add card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCard;
