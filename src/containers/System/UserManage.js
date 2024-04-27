import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUser, deleteUser, editUser} from '../../services/userServices';
import ModalUser from './ModalUser';
import {emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { Fade } from 'reactstrap';

class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditUser: false,
            userEdit: {}
        }
    }
  
    async componentDidMount() {
        await this.getAllUSersFromReact();
        
    }
    getAllUSersFromReact = async() => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    /** Life cycle
         * Run component:
         * 1. Run construct -> init state
         * 2. Did mount
         * 3. Render
    */
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
       
        })
    }
    toggleNewUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUser = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        })
    }

    createNewUser = async(data) => {
       try {
            let response = await createNewUser(data);
            if(response && response.message.errCode !== 0){
                alert(response.message.errMessage);
            }else{
                await this.getAllUSersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
       } catch (error) {
            console(error);
       }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUser(user.id);
            if(res && res.errCode === 0){
                await this.getAllUSersFromReact();
            }else{
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditUser: true,
            userEdit : user
        })
    }
    editUser = async(user) =>{

        try {
            let res = await editUser(user);
        if(res && res.errCode === 0){
            this.setState({
                isOpenEditUser: false
            })
            await this.getAllUSersFromReact()
        }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleNewUser = {this.toggleNewUser}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenEditUser &&
                <ModalEditUser
                    isOpen = {this.state.isOpenEditUser}
                    toggleNewUser = {this.toggleEditUser}
                    currentUser = {this.state.userEdit}
                    editUser = {this.editUser}
                />}
                <div className='title text-center'> Manage Users </div>
                <div className="mx-1">
                    
                    <button type="button" className="btn btn-primary px-2 mb-3"
                    onClick={() => {this.handleAddNewUser()}}
                    
                    
                    >
                    <i className="fas fa-plus px-2"></i>
                        Add new users
                    </button>
                </div>
                <div className='users-table'>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   arrUsers && arrUsers.map((item, index) => {
                              return (
                                    <>

                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>    
                                                <button type="button" 
                                                className="btn btn-success" 
                                                style={{marginRight: 10, paddingRight:10 , paddingLeft: 10}}

                                                onClick={() => {
                                                    this.handleEditUser(item);
                                                }}
                                                >Edit</button>
                                                <button type="button" 
                                                className="btn btn-danger"
                                                style={{marginRight: 10, paddingRight:10 , paddingLeft: 10}}
                                                onClick={() => {
                                                    this.handleDeleteUser(item);
                                                }}
                                                >Delete</button>
                                            </td>
                                            
                                        </tr>
                                    </>
                                 )
                                })

                            }
                            
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
