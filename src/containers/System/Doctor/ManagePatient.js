import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
import { getAllBookedPatient } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
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
        }, () => {
            this.checkUser();
        });
    }

    handleBtnConfirm = () => {

    }

    handleBtnSendReceipt = () => {

    }

    render() {
        let { dataPatient } = this.state;

        return (
            <div className="manage-patient-container">
                <div className="manage-patient-title">
                    Quản lý bệnh nhân đặt lịch khám
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
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
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Hành động</th>
                                </tr>
                                {
                                    dataPatient && dataPatient.length > 0
                                    ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataConfirm.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>
                                                        <button 
                                                            className="btn-confirm"
                                                            onClick={() => this.handleBtnConfirm()}
                                                        >Xác nhận
                                                        </button>

                                                        <button 
                                                            className="send-receipt"
                                                            onClick={() => this.handleBtnSendReceipt()}
                                                        >Gửi hóa đơn
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    :
                                        <div>Không có lịch hẹn nào</div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
