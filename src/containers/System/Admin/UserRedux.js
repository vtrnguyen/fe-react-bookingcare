import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImaUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    // when component update data, this function will run
    componentDidUpdate(prevProps, prevState, snapshot) {
        // check the previous data and the current data, if it is diffrent, it will implement
        if (prevProps.genderRedux !== this.props.genderRedux) {{
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            })
        }}

        // same
        if (prevProps.positionRedux !== this.props.positionRedux) {{
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
            })
        }}

        // same
        if (prevProps.roleRedux !== this.props.roleRedux) {{
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length ? arrRoles[0].key : '',
            })
        }}

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            });
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImaUrl: objectUrl,
                avatar: file,
            })
        }

    }

    openPreviewImage = () => {
        if (!this.state.previewImaUrl) return;
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        // fire redux action this.state
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        });
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 
            'phoneNumber', 'address'];

        for(let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is required: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, 
            phoneNumber, address, gender, position, role, avatar 
        } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux with Origin Dev
                </div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12">{ isLoadingGender === true ? "Loading genders" : "" }</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input
                                    className="form-control" 
                                    type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input
                                    className="form-control" 
                                    type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input
                                    className="form-control" 
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input
                                    className="form-control" 
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input
                                    className="form-control" 
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input
                                    className="form-control" 
                                    type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select 
                                    className="form-control" 
                                    onChange={ (event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select 
                                    className="form-control"
                                    onChange={ (event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 
                                    && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select 
                                    className="form-control"
                                    onChange={ (event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 
                                    && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input 
                                        id="previewImg" 
                                        type="file" 
                                        hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div 
                                        className="preview-image"
                                        previewImaUrl
                                        style={{ backgroundImage: `url(${this.state.previewImaUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                        >
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id="manage-user.save" /></button>
                            </div>

                            <div className="col-12 mb-5">
                                <TableManageUser />
                            </div>
                        </div>
                    </div>
                
                </div>

                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImaUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
