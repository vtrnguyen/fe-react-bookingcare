import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('all');
        
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }

    }

    handleEditBtn = () => {
        alert('Edit button clicked!');
    }

    handleDeleteBtn = () => {
        alert('Delete button clicked!');
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users with Origin Dev</div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
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
                                            <button className="btn-edit" onClick={() => this.handleEditBtn()}><i className="far fa-edit"></i></button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteBtn()}><i class="far fa-trash-alt"></i></button>
                                        </td>    
                                    </tr>
                                )
                            })
                        }
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
