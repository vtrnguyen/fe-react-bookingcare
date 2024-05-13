import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./DetailClinic.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/Modal/ProfileDoctor';
import { getDetailClinictyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            showFullDescription: false,
            buttonShow: '', 
            buttonHide: '', 
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let clinicId = this.props.match.params.id;
            
            let resDetailClinic = await getDetailClinictyById({
                id: clinicId,
            });

            if (resDetailClinic && resDetailClinic.errCode === 0) {
                let listClinicDoctorId = [];
                if (resDetailClinic.data && !_.isEmpty(resDetailClinic.data)) {
                    let arr = resDetailClinic.data.clinicDoctor;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            listClinicDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailClinic: resDetailClinic.data,
                    arrDoctorId: listClinicDoctorId,
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

    handleClickShowDescription = () => {
        this.setState({
            showFullDescription: !this.state.showFullDescription,
        });
    }

    render() {
        let { arrDoctorId, dataDetailClinic,
            showFullDescription,
            buttonShow, buttonHide } = this.state;
        let { language } = this.props;
        console.log(arrDoctorId);

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                        &&
                            <>
                                <div className="clinic-name">{dataDetailClinic.name}</div>
                                <div>
                                    <div style={{ maxHeight: showFullDescription ? 'none' : '200px', overflow: 'hidden' }}>
                                        <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                    </div>
                                    <div
                                        className="btn-show-hide"
                                        onClick={() => this.handleClickShowDescription()}
                                    >
                                        {showFullDescription ? buttonHide : buttonShow}
                                    </div>
                                </div>
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
