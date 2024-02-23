import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì về Origin Dev
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe 
                            width="100%" 
                            height="400px" 
                            src="https://www.youtube.com/embed/3xdnZS0NHkY" 
                            title="Day in The Life of a Software Engineer (ep. 37)" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>Chàng trai với nhiều ước mơ và hoài bão. Mong rằng trên đường đời của mình, hắn ta sẽ luôn vượt qua những gian nan thử thách.</p>
                        <p>The boy had many dreams and aspirations. Hope that throughout his life journey, he will always overcome challenges and hardships.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
