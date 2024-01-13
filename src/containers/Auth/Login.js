import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
        console.log(e.target.value);
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
        console.log(e.target.value);
    }

    handleOnclickLoginBtn = () => {
        console.log('>>> check username: ', this.state.username);
        console.log('>>> check password: ', this.state.password);
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) => this.handleChangeUsername(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control" 
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChangePassword(e)}
                                />
                                <span
                                    onClick={() => {this.handleShowHidePassword()}}
                                >
                                    <i class={this.state.isShowPassword ? "fas fa-eye-slash" : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button 
                                className="btn-login"
                                onClick={() => this.handleOnclickLoginBtn()}
                                >Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-2">
                            <span className="text-other-login">Or login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i class="fab fa-instagram instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
