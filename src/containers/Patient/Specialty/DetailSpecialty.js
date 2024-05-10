import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./DetailSpecialty.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/Modal/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;
            
            let resDetailSpecialty = await getDetailSpecialtyById({
                id: specialtyId,
                location: "all",
            });

            let resProvince = await getAllCodeService("PROVINCE");

            if (resDetailSpecialty && resDetailSpecialty.errCode === 0
                && resProvince.errCode === 0
            ) {
                let listSpecialtyDoctorId = [];
                if (resDetailSpecialty.data && !_.isEmpty(resDetailSpecialty.data)) {
                    let arr = resDetailSpecialty.data.specialtyDoctor;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            listSpecialtyDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailSpecialty: resDetailSpecialty.data,
                    arrDoctorId: listSpecialtyDoctorId,
                    listProvince: resProvince.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    handleOnChangeSelectProvince = (event) => {
        console.log(">>> Check select onChange: ", event.target.value);
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className="search-doctor-by-province">
                        <select onChange={(event) => this.handleOnChangeSelectProvince(event)}>
                            {
                                listProvince && listProvince.length > 0 
                                && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI 
                                            ?
                                                item.valueVi
                                            :
                                                item.valueEn
                                            }
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {
                        arrDoctorId && arrDoctorId.map((item, index) => {
                            return (
                                <div className="doctor-infor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor 
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule 
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor 
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
