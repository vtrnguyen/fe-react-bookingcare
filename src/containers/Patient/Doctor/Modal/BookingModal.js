import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import Select from "react-select";
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: '',
        }
    }

    componentDidMount() {
        this.props.fetchGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
            if (this.props.dataScheduleTime && !_.isEmpty(this.props.dataScheduleTime)) {
                let { doctorId, timeType } = this.props.dataScheduleTime;
                
                this.setState({
                    doctorId,
                    timeType,
                });
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0],
        });
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    }

    checkEmailFormat = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isFormatted = false;
        
        if (emailPattern.test(email)) {
            isFormatted = true;
        } else {
            toast.error("Invalid email!!!");
        }
        
        return isFormatted;
    }

    checkPhoneNumberFormat = (phoneNumber) => {
        const phonePattern = /^(0|\+84)?[1-9]\d{8}$/;
        let isFormatted = false;
        
        if (phonePattern.test(phoneNumber)) {
            isFormatted = true;
        } else {
            toast.error("Invalid phone number!!!");
        }
        
        return isFormatted;
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI
                ? dataTime.timeTypeData.valueVi
                : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY');
            return (
                `${time} - ${date}`
            )
        } else {
            return (
                ``
            );
        }
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let fullName = language === LANGUAGES.VI 
                ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return fullName;
        } else {
            return (
                ``
            );
        }
    }

    handleConfirmBooking = async () => {
        if (!this.state.fullName || !this.state.phoneNumber 
            || !this.state.reason || !this.state.address
            || !this.state.selectedGender || !this.state.email || !this.state.birthDay) {
            toast.error("Missing input parameter!!!");
        } else {
            let isValidEmail = this.checkEmailFormat(this.state.email);
            let isValidPhoneNumber = this.checkPhoneNumberFormat(this.state.phoneNumber);
    
            if (!isValidEmail || !isValidPhoneNumber) return;

            let date = new Date(this.state.birthDay).getTime();
            let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
            let doctorName = this.buildDoctorName(this.props.dataScheduleTime);
            let res = await postPatientBookAppointment({
                patientName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
            });
    
            if (res && res.errCode === 0 && res.errSubCode === 1) {
                toast.success(`${res.errMessage}`);
                this.props.handleCloseModal();
                this.setState({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    reason: '',
                    birthDay: '',
                    selectedGender: '',
                });
            } else if (res && res.errCode === 0 && res.errSubCode === 0) {
                toast.success(`${res.errMessage}`);
            } else {
                toast.error("Booking a new appointment is not successfully!!!");
            }
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
                            <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
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
                                    <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                    <input 
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                    <input 
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input 
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input 
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input 
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker 
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthDay}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select 
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button 
                                className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.confirm-button" />
                            </button>
                            <button 
                                className="btn-booking-cancel"
                                onClick={handleCloseModal}
                            >
                                <FormattedMessage id="patient.booking-modal.cancel-button" />
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
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
