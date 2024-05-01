import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            bookingDate : '',
            rangeTime: [],
        }
    }

    componentDidMount = () => {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            
            if (data && data.length > 0) {
                data.map((item, index) => {
                    item.isSelected = false;
                });
            }

            this.setState({
                rangeTime: data,
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
    
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                
                result.push(object);
            });
        }

        return result;
    }

    handleSelectionDoctorChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            bookingDate: date[0],
        });
    }

    handleClickScheduleBtn = (scheduleTime) => {
        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map((item, index) => {
                if (item.id === scheduleTime.id) {
                    item.isSelected = !item.isSelected;
                }
            })
        }

        this.setState({
            rangeTime
        })
    }

    handleSaveDoctorSchedule = async () => {
        let { rangeTime, selectedDoctor, bookingDate } = this.state;
        let formatedDate = new Date(bookingDate).getTime();
        let result = [];

        // check existing of booking date
        if (!bookingDate) {
            toast.error('Invalid date!!!');
            return;
        }

        // check doctor want to create schedule
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('No doctor has been selected!!!');
            return;
        }

        if (rangeTime && rangeTime.length > 0) {
            // check selected time, if it is selected, change the attribute isSlected to true
            let selectedTime = rangeTime.filter((item, index) => {
                return item.isSelected === true;
            });

            if (selectedTime && selectedTime.length > 0) {
                // add the data to each element
                selectedTime.map((item, index) => {
                    let scheduleObject = {};
                    scheduleObject.doctorId = selectedDoctor.value;
                    scheduleObject.date = formatedDate;
                    scheduleObject.timeType = item.keyMap;

                    // push each element into the result array
                    result.push(scheduleObject);
                });

                // send the data want to create to the server
                let response = await saveBulkScheduleDoctor({
                    arrSchedule: result,
                    doctorId: selectedDoctor.value,
                    formatedDate: formatedDate,
                });

            } else {
                toast.error('No time has been selected!!!');
            }
        }
    }
    
    render() {
        let { rangeTime } = this.state;
        let language = this.props.language;

        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                                options={this.state.listDoctors}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-schedule" /></label>
                            <DatePicker 
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.bookingDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button 
                                            className={item.isSelected === true ? "btn schedule-time active" : "btn schedule-time"}
                                            key={index}
                                            onClick={() => this.handleClickScheduleBtn(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className="col-12">
                            <button 
                                className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveDoctorSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save-schedule" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
