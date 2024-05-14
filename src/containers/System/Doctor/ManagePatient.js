import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: new Date(),
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            bookingDate: date[0],
        });
    }

    render() {

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
                            <tr>
                                <th>Name</th>
                                <th colSpan="2">Telephone</th>
                            </tr>
                            <tr>
                                <td>Bill Gates</td>
                                <td>456</td>
                                <td>123</td>
                            </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
