import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    handleShowHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám Chuyên khoa Da liễu</div>
                    <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="content-down">
                    { isShowDetailInfor === false 
                    ?
                        <div className="short-infor">
                            GIÁ KHÁM: 250.000đ. 
                            <span 
                                onClick={() => this.handleShowHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    :
                        <>
                            <div className="title-detail-price">GIÁ KHÁM:</div>
                            <div className="body-detail-price">
                                <div className="price">
                                    <span className="left">Giá khám:</span>
                                    <span className="right">250.000đ</span>
                                </div>

                                <div className="note">
                                    Được ưu tiên khám trước khi đặt khám qua Bookingcare. Giá khám cho người nước ngoài là 30 USD.
                                </div>
                            </div>
                            <div className="payment">
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ.
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.handleShowHideDetailInfor(false)}>
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
