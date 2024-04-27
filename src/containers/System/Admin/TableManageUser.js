import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'





class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
       this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserStart(user.id);
    }

    handleEditUser = (user) => {
        console.log(user);
        this.props.handleEditUserFrom(user);
    }

    render() {
        let arrUsers = this.state.userRedux; 
        return (
            <React.Fragment>
                 <div className="user-container">
               
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

                           <>
                         
                           { arrUsers && arrUsers .length > 0 && arrUsers.map((item, index) => {
                               return(
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
                                           // style={{marginRight: 10, paddingRight:10 , paddingLeft: 10}}
                                           onClick={() => {
                                               this.handleDeleteUser(item);
                                           }}
                                           >Delete</button>
                                       </td>
                                               
                                   </tr>     
                               )
                           })}
                                       
                           </>
    
                 
                       </tbody>
                   </table>
               </div>
                </div>
                
            </React.Fragment>
           
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
