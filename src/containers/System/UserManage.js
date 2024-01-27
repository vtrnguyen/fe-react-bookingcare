import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from './ModalDeleteUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            isOpenModalDeleteUser: false,
            userEdit: {},
            userDelete: {},
        }
    }

    async componentDidMount() {
        this.getAllUsersFromReact();        
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    handleEditUserBtn = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    handleDeleteUserBtn = (user) => {
        this.setState({
            isOpenModalDeleteUser: true,
            userDelete: user,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: false,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: false,
        })
    }

    toggleUserDeleteModal = () => {
        this.setState({
            isOpenModalDeleteUser: false,
        })
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('all');
        
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    createNewUser = async (dataUser) => {
        try {
            let response = await createNewUserService(dataUser);
            
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                })

                // fire event 'EVENT_CLEAR_MODAL_DATA' to clear ModalUser's state
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (e) {
            console.log(e);            
        }
    }

    editUser = async (user) => {
        try {
            let response = await editUserService(user);
            
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                })

                await this.getAllUsersFromReact();
            } else {
                alert(response.errCode);
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    deleteUser = async (isDelete) => {
        if (isDelete === true) {
            let deleteForceUser = this.state.userDelete;
            try {
                let response = await deleteUserService(deleteForceUser.id);
                
                if (response && response.errCode === 0) {
                    await this.getAllUsersFromReact();
                    this.setState({
                        isOpenModalDeleteUser: false,
                    })
                } else {
                    alert(response.errMessage);
                }

            } catch (e) {
                console.log(e);
            }
        } else {
            this.setState({
                isOpenModalDeleteUser: false,
            })
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser === true && 
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <ModalDeleteUser 
                        isOpen={this.state.isOpenModalDeleteUser}
                        toggleFromParent={this.toggleUserDeleteModal}
                        deleteUser={this.deleteUser}
                />
                <div className="title text-center">Manage users with Origin Dev</div>
                <div className="mx-1">
                    <button 
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                            { arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUserBtn(item)}><i className="far fa-edit"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUserBtn(item)}><i className="far fa-trash-alt"></i></button>
                                            </td>    
                                        </tr>
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
