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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
    
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                
                result.push(object);
            });
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
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
                    Quản lý thông tin bác sĩ
                </div>

                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(selectedDoctor) => this.handleSelectionDoctorChange(selectedDoctor)}
                            options={this.state.listDoctors}
                        />
                    </div>

                    <div className="content-right">
                        <label>Thông tin bác sĩ</label>
                        <textarea 
                            className="form-control" 
                            rows="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}>
                            
                        </textarea>
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
                            <span>Lưu thông tin</span>
                            :
                            <span>Tạo thông tin</span>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDotor: (data) => dispatch(actions.saveDetailDotor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
