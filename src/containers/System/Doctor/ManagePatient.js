import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
import { getAllBookedPatient, postSendingRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            openRemedyModal: false,
            dataRemedyModal: {},
            closeRemedyModal: false,
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.checkUser();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.user !== prevProps.user) {
            this.checkUser();
        }
    }

    checkUser = async () => {
        let { user } = this.props;
        let { bookingDate } = this.state;
        let formattedDate = new Date(bookingDate).getTime();
        if (user && user.id) {
            let res = await getAllBookedPatient({
                doctorId: user.id,
                date: formattedDate,
            });

            if (res && res.errCode === 0) {
                this.setState({
                    dataPatient: res.data,
                });
            }
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            bookingDate: date[0],
        }, async () => {
            await this.checkUser();
        });
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            bookingTime: item.timeTypeDataConfirm,
        }

        this.setState({
            openRemedyModal: true,
            dataRemedyModal: data,
        });
    }

    handleCloseRemedyModal = () => {
        this.setState({
            openRemedyModal: false,
            dataRemedyModal: {}
        })
    }

    handleSendRemedy = async (dataFromRemedyModal) => {
        let { dataRemedyModal } = this.state;

        this.setState({
            isShowLoading: true,
        });

        let res = await postSendingRemedy({
            email: dataFromRemedyModal.email,
            imgBase64: dataFromRemedyModal.imgBase64,
            doctorId: dataRemedyModal.doctorId,
            patientId: dataRemedyModal.patientId,
            timeType: dataRemedyModal.timeType,
            language: this.props.language,
            patientName: dataRemedyModal.patientName,
            bookingTime: dataRemedyModal.bookingTime,
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });

            toast.success("Sending remedy is success.");
            this.checkUser();
            this.handleCloseRemedyModal();
        } else {
            this.setState({
                isShowLoading: false,
            });

            toast.error("Send remedy is not success!!!");
        }
    }

    render() {
        let { language } = this.props;
        let { dataPatient, openRemedyModal, dataRemedyModal } = this.state;

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text={<FormattedMessage id="manage-patient.text-loading" />}
                >
                    <RemedyModal 
                        openModal={openRemedyModal}
                        dataRemedy={dataRemedyModal}
                        closeModal={this.handleCloseRemedyModal}
                        sendRemedy={this.handleSendRemedy}
                    />
                    <div className="manage-patient-container">
                        <div className="manage-patient-title">
                            <FormattedMessage id="manage-patient.manage-patient-title" />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="manage-patient.choose-booking-date" /></label>
                                <DatePicker 
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.bookingDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-patient.ordinal-number" /></th>
                                            <th><FormattedMessage id="manage-patient.time" /></th>
                                            <th><FormattedMessage id="manage-patient.full-name" /></th>
                                            <th><FormattedMessage id="manage-patient.address" /></th>
                                            <th><FormattedMessage id="manage-patient.gender" /></th>
                                            <th><FormattedMessage id="manage-patient.actions" /></th>
                                        </tr>
                                        {
                                            dataPatient && dataPatient.length > 0
                                            ?
                                                dataPatient.map((item, index) => {
                                                    let timeType = language == LANGUAGES.VI 
                                                        ? item.timeTypeDataConfirm.valueVi 
                                                        : item.timeTypeDataConfirm.valueEn;
                                                    let gender = language == LANGUAGES.VI 
                                                        ? item.patientData.genderData.valueVi 
                                                        : item.patientData.genderData.valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{timeType}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button 
                                                                    className="btn-confirm"
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                >
                                                                    <FormattedMessage id="manage-patient.confirm-button" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            :
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}><FormattedMessage id="manage-patient.no-schedule" /></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
