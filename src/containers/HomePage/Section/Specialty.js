import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import "./Specialty.scss";
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state;
        let { language } = this.props;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.popular-speciality"/></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div 
                                            className="section-customize specialty-child" 
                                            key={index}
                                        >
                                            <div 
                                                className="bg-image section-specialty"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            />
                                            <div 
                                                className="specialty-name"
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            >
                                                {item && language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            
                        </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
