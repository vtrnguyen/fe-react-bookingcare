import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            
        }
    }

    getInforDoctor = async (doctorId) => {
        let result = {};
        if (doctorId) {
            let res = await getProfileDoctorById(doctorId);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI
                ? dataTime.timeTypeData.valueVi
                : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY');
            return (
                <>
                    <div className="display-time">{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.booking-price" /></div>
                </>
            )
        } else {
            return (
                <></>
            );
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime,
            isShowLinkDetailDoctor, isShowPrice, doctorId
        } = this.props;
        let nameVi = '', nameEn = '';

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div 
                        className="content-left" 
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>

                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true
                            ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && 
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                            :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="clinic-infor">
                    <b className="clinic-infor-text"><FormattedMessage id="patient.booking-modal.clinic-infor" /></b>&nbsp;
                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.nameClinic 
                        && dataProfile.Doctor_Infor.addressClinic &&
                        <span>{dataProfile.Doctor_Infor.nameClinic} - {dataProfile.Doctor_Infor.addressClinic}</span>
                    }
                </div>
                {
                    isShowLinkDetailDoctor && 
                    <div 
                        className="view-detail-doctor"
                    >
                        <Link 
                            to={`/detail-doctor/${doctorId}`}
                            className="redirect-link-detail-doctor"
                        >
                            <FormattedMessage id="patient.detail-doctor.show-link"/>
                        </Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className="price">
                        <b className="price-text"><FormattedMessage id="patient.booking-modal.price-title" /></b>&nbsp;
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI 
                            ? 
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix='VND' 
                                />
                            : ''
                        }
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                            ? 
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix='$'
                                />
                            : ''
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
