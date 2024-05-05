import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    render() {
        let { isOpenModal, handleCloseModal, dataScheduleTime } = this.props;
        let doctorId = dataScheduleTime && !_.isEmpty(dataScheduleTime) ? dataScheduleTime.doctorId : '';

        return (
            <div>
                <Modal 
                    isOpen={isOpenModal} 
                    className="booking-modal-container" 
                    size="lg"
                    centered={true}
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span 
                                className="right"
                                onClick={handleCloseModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor 
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataScheduleTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ Email</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên lạc</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input 
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button 
                                className="btn-booking-confirm"
                                onClick={handleCloseModal}
                            >
                                Xác nhận
                            </button>
                            <button 
                                className="btn-booking-cancel"
                                onClick={handleCloseModal}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
