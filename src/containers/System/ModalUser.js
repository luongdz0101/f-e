import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input ,Label ,FormGroup, Form} from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { tail } from 'lodash';
import {emitter } from '../../utils/emitter';


class ModalUser extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
           
        }

        this.listenToEmitter();
    }
    listenToEmitter()  {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        });
    };
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleNewUser();
    }

    handleOnChangeInput = (event, id) => {
      let copyState = {...this.state};
      copyState[id] = event.target.value;
      this.setState({
        ...copyState
      });

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
       
        let isValid = this.checkValidateInput();
        if(isValid === true){
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
            size='xl'
            centered

            isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} className={'abcClassName'}
            >
                <ModalHeader toggle={()=>{this.toggle()}} >Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">
                            Email
                            </Label>
                            <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="with a placeholder"
                            type="email"
                            onChange={
                                (event) => {
                                    this.handleOnChangeInput(event, 'email')
                                }
                            }
                            value={this.state.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                            Password
                            </Label>
                            <Input
                            id="examplePassword"
                            name="password"
                            placeholder="password placeholder"
                            type="password"
                            onChange={
                                (event) => {
                                    this.handleOnChangeInput(event,'password')
                                }
                            }
                            value={this.state.password}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleFistName">
                                First Name
                            </Label>
                           
                            <Input 
                                id="FirstName"
                                name="FirstName"
                                placeholder="FirstName placeholder"
                                type="text"
                                onChange={
                                    (event) => {
                                        this.handleOnChangeInput(event,'firstName')
                                    }
                                }
                                value={this.state.firstName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleLastName">
                                Last Name
                            </Label>
                           
                            <Input 
                                id="LastName"
                                name="LastName"
                                placeholder="LastName placeholder"
                                type="text"
                                onChange={
                                    (event) => {
                                        this.handleOnChangeInput(event,'lastName')
                                    }
                                }
                                value={this.state.lastName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleAddress">
                                Address
                            </Label>
                           
                            <Input 
                                id="Address"
                                name="Address"
                                placeholder="Address placeholder"
                                type="text"
                                onChange={
                                    (event) => {
                                        this.handleOnChangeInput(event,'address')
                                    }
                                }
                                value={this.state.address}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={()=>{this.handleAddNewUser()}}>
                    Add New
                </Button>{' '}
                <Button color="secondary" onClick={()=>{this.toggle()}}>
                    Close
                </Button>
                </ModalFooter>
                </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



