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
            showFullDescription: false,
            buttonShow: '', 
            buttonHide: '', 
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

                let dataProvince = resProvince.data;

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'all',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc',
                        valueEn: 'All',
                    });
                }

                this.setState({
                    dataDetailSpecialty: resDetailSpecialty.data,
                    arrDoctorId: listSpecialtyDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                    buttonShow: this.props.language === LANGUAGES.VI ? "Xem thêm" : "More",
                    buttonHide: this.props.language === LANGUAGES.VI ? "Ẩn bớt" : "Hide",
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                buttonShow: this.props.language === LANGUAGES.VI ? "Xem thêm" : "More",
                buttonHide: this.props.language === LANGUAGES.VI ? "Ẩn bớt" : "Hide",
            });
        }
    }

    handleOnChangeSelectProvince = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;
            let location = event.target.value;  
        
            let resDetailSpecialty = await getDetailSpecialtyById({
                id: specialtyId,
                location: location,
            });

            if (resDetailSpecialty && resDetailSpecialty.errCode === 0) {
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
                    buttonShow: this.props.language === LANGUAGES.VI ? "Xem thêm" : "More",
                    buttonHide: this.props.language === LANGUAGES.VI ? "Ẩn bớt" : "Hide",
                });
            }
        }
    }

    handleClickShowDescription = () => {
        this.setState({
            showFullDescription: !this.state.showFullDescription,
        });
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, 
            listProvince, showFullDescription,
            buttonShow, buttonHide } = this.state;
        let { language } = this.props;

        console.log(">>> Check state: ", this.state);

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        &&
                            <div>
                                <div style={{ maxHeight: showFullDescription ? 'none' : '200px', overflow: 'hidden' }}>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                                </div>
                                <div
                                    className="btn-show-hide"
                                    onClick={() => this.handleClickShowDescription()}
                                >
                                    {showFullDescription ? buttonHide : buttonShow}
                                </div>
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
                                                isShowLinkDetailDoctor={true}
                                                isShowPrice={false}
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
