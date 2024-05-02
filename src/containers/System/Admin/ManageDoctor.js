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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
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
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
    
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                
                result.push(object);
            });
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataPriceSelect = this.buildDataInputSelect(resPrice);
            let dataPaymentSelect = this.buildDataInputSelect(resPayment);
            let dataProvinceSelect = this.buildDataInputSelect(resProvince);
            this.setState({
                listPrices: dataPriceSelect,
                listPayments: dataPaymentSelect,
                listProvinces: dataProvinceSelect,
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
        });

        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false,
            selectedDoctor: ''
        })
    }

    handleSelectionDoctorChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor,
        });

        let res = await getDetailInforDoctor(selectedDoctor.value);
    
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }

    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value,
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
                            onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                            options={this.state.listDoctors}
                            placeholder="Chọn bác sĩ"
                        />
                    </div>

                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.introduction" />
                        </label>
                        <textarea 
                            className="form-control" 
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>

                <div className="detail-doctor-infor row">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                            options={this.state.listPrices}
                            placeholder="Chọn giá"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                            options={this.state.listPayments}
                            placeholder="Chọn phương thức thanh toán"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                            options={this.state.listProvinces}
                            placeholder="Chọn tỉnh thành"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Ghi chú</label>
                        <input className="form-control" />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '500px' }} 
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
