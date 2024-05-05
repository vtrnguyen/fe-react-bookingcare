import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import NumberFormat from 'react-number-format';

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

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
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
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && 
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className="clinic-infor">
                    <b className="clinic-infor-text">Thông tin phòng khám:</b>&nbsp;
                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.nameClinic 
                        && dataProfile.Doctor_Infor.addressClinic &&
                        <span>{dataProfile.Doctor_Infor.nameClinic} - {dataProfile.Doctor_Infor.addressClinic}</span>
                    }
                </div>
                <div className="price">
                    <b className="price-text">Giá khám</b>:&nbsp;
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
