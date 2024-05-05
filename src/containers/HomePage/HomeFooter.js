import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>&copy; Copy right 2024 by Origin Dev. <a target="_blank" href="https://www.facebook.com/jorigin.065">Click here for more information about us</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
