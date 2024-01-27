import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWantToDelete: false,
        }
    }

    componentDidMount() {
        this.handleDeleteForceUser();
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleDeleteForceUser = () => {
        this.setState({
            isWantToDelete: true,
        })
        this.props.deleteUser(this.state.isWantToDelete);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => { this.toggle() }} 
                className="modal-user-container"
                size="small"
            >
                <ModalHeader toggle={() => { this.toggle() }}>DELETE USER</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <h4>This action will not restore! Do you still want to implement?</h4>
                        </div>
                    </ModalBody>
                <ModalFooter>
                        <Button 
                            color="danger" 
                            className="px-3" 
                            onClick={() => { this.handleDeleteForceUser() }}
                            >Delete
                        </Button>
                        <Button 
                            color="secondary" 
                            className="px-3" 
                            onClick={() => { this.toggle() }}
                            >Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
