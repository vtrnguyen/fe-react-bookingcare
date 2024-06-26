import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save markdown doctor
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // saving detail doctor infor
            listPrices: [],
            listPayments: [],
            listProvinces: [],
            listSpecialties: [],
            listClinics: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.nameVi}`;
                    let labelEn = `${item.nameEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "CLINIC") {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataPriceSelect = this.buildDataInputSelect(resPrice, "PRICE");
            let dataPaymentSelect = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataProvinceSelect = this.buildDataInputSelect(resProvince, "PROVINCE");
            let dataSpecialtySelect = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            let dataClinicSelect = this.buildDataInputSelect(resClinic, 'CLINIC');
            
            this.setState({
                listPrices: dataPriceSelect,
                listPayments: dataPaymentSelect,
                listProvinces: dataProvinceSelect,
                listSpecialties: dataSpecialtySelect,
                listClinics: dataClinicSelect,
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;
            let dataPriceSelect = this.buildDataInputSelect(resPrice, "PRICE");
            let dataPaymentSelect = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataProvinceSelect = this.buildDataInputSelect(resProvince, "PROVINCE");
            let dataSpecialtySelect = this.buildDataInputSelect(resSpecialty, "SPECIALTY");

            this.setState({
                listDoctors: dataSelect,
                listPrices: dataPriceSelect,
                listPayments: dataPaymentSelect,
                listProvinces: dataProvinceSelect,
                listSpecialties: dataSpecialtySelect,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentDoctor = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDotor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? 'EDIT' : 'CREATE',

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,
        });

        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false,
            selectedDoctor: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        })
    }

    handleSelectDoctorChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor,
        });

        let { listPrices, listPayments, listProvinces, listSpecialties, listClinics } = this.state;

        let res = await getDetailInforDoctor(selectedDoctor.value);
        let markdown = res.data.Markdown;
        let paymentId = '', priceId = '', provinceId = '',
            addressClinic = '', nameClinic = '', note = '',
            specialtyId = '', clinicId;
        let selectedPrice = '', selectedPayment = '', 
            selectedProvince = '', selectedSpecialty = '',
            selectedClinic = '';

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            if (res.data.Doctor_Infor) {
                nameClinic = res.data.Doctor_Infor.nameClinic;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                note = res.data.Doctor_Infor.note;

                priceId = res.data.Doctor_Infor.priceId;
                paymentId = res.data.Doctor_Infor.paymentId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                // get selected price
                selectedPrice = listPrices.find(item => {
                    return item && item.value === priceId;
                });

                // get selected payment
                selectedPayment = listPayments.find(item => {
                    return item && item.value === paymentId;
                });

                // get selected province
                selectedProvince = listProvinces.find(item => {
                    return item && item.value === provinceId;
                });

                // get selected specialty
                selectedSpecialty = listSpecialties.find(item => {
                    return item && item.value === specialtyId;
                });

                // get selected clinic
                selectedClinic = listClinics.find(item => {
                    return item && item.value === clinicId;
                });
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
            });
        }

    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    }

    render() {
        let { hasOldData } = this.state;
        
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleSelectDoctorChange}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.doctorPlaceholder" />}
                        />
                    </div>

                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.introduction" />
                        </label>
                        <textarea 
                            className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>

                <div className="detail-doctor-infor row">
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.price" />}
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrices}
                            placeholder={<FormattedMessage id="admin.manage-doctor.pricePlaceholder" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>{<FormattedMessage id="admin.manage-doctor.payment" />}</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayments}
                            placeholder={<FormattedMessage id="admin.manage-doctor.paymentPlaceholder" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.province" />}
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvinces}
                            placeholder={<FormattedMessage id="admin.manage-doctor.provincePlaceholder" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.clinicName" />}
                        </label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.clinicAddress" />}
                        </label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.note" />}
                        </label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.specialty" />}
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialties}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialtyPlaceholder" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            {<FormattedMessage id="admin.manage-doctor.clinic" />}
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinics}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinicPlaceholder" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button 
                    className={ hasOldData === true ? "edit-content-doctor" : "create-content-doctor" }
                    onClick={() => this.handleSaveContentDoctor()}
                    >
                    {
                        hasOldData === true ? 
                            <span>
                                <FormattedMessage id="admin.manage-doctor.save-infor"></FormattedMessage>
                            </span>
                            :
                            <span>
                                <FormattedMessage id="admin.manage-doctor.create-infor"></FormattedMessage>
                            </span>
                    }
                </button>
            </div>    

        );  
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDotor: (data) => dispatch(actions.saveDetailDotor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
