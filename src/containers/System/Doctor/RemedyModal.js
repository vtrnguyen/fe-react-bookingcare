import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';
import { LANGUAGES } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    componentDidMount() {
        if (this.props.dataRemedy) {
            this.setState({
                email: this.props.dataRemedy.email,
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataRemedy !== this.props.dataRemedy) {
            this.setState({
                email: this.props.dataRemedy.email,
            });
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    render() {
        let { openModal, closeModal } = this.props;
        let { email } = this.state;

        return (
            <Modal 
                isOpen={openModal}
                className="remedy-modal-container" 
                size="md"
                centered={true}
            >
                <div className="modal-header">
                    <h5 className="modal-titile"><FormattedMessage id="manage-patient.remery-modal.title"/></h5>
                    <button type="button" className="close" aria-label="close" onClick={closeModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-patient.remery-modal.patient-email"/></label>
                            <input 
                                className="form-control" 
                                type="email" 
                                value={email} 
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-patient.remery-modal.remedy-file"/></label>
                            <input 
                                className="form-control-file" 
                                type="file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        onClick={() => this.handleSendRemedy()}
                    >
                        Gửi hóa đơn
                    </Button>
                    <Button color="secondary" onClick={closeModal}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
