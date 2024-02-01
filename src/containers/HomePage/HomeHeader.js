import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div><b>Chuyên khoa</b></div>
                                <div className="subs-titile">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="subs-titile">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div><b>Bác sĩ</b></div>
                                <div className="subs-titile">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div><b>Gói khám</b></div>
                                <div className="subs-titile">Khám sức khỏe tổng quát</div>
                            </div>
                        </div>

                        <div className="right-content">
                            <div className="support"><i className="far fa-question-circle"></i> Hỗ trợ</div>
                            <div className="flag">VN</div>
                        </div>
                    </div>                
                </div>

                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-1">NỀN TẢNG Y TẾ</div>
                        <div className="title-2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh"></input>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="far fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child">Khám từ xa</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                                <div className="text-child">Khám tổng quát</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-vial"></i></div>
                                <div className="text-child">Xét nghiệm y học</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-walking"></i></div>
                                <div className="text-child">Sức khỏe tinh thần</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fas fa-user-md"></i></div>
                                <div className="text-child">Khám nha khoa</div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
