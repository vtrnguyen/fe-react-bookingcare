import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyName: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
    }

    handleOnChangeInput = (e, type) => {
        let stateCopy = {...this.state};
        stateCopy[type] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkDown: text,
            descriptionHTML: html,
        });
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            });
        }
    }

    handleSaveNewSpecialty = async () => {
        let { specialtyName, imageBase64, descriptionHTML, descriptionMarkDown } = this.state;
        
        if (!specialtyName || !descriptionHTML || !descriptionHTML) {
            toast.error('Missing input parameter!!!');
            return;
        }

        let res = await createNewSpecialty({
            specialtyName,
            imageBase64,
            descriptionHTML,
            descriptionMarkDown,
        });

        if (res && res.errCode === 0) {
            toast.success('Add new specialty success!');
        } else {
            toast.error('Add new specialty does not success!!!');
        }
    }

    render() {

        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-title">Quản lý chuyên khoa</div>
                
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input 
                            className="form-control" 
                            type="text"
                            value={this.state.specialtyName}
                            onChange={(e) => this.handleOnChangeInput(e, 'specialtyName')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input 
                            className="form-control-file" 
                            type="file"
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px '}}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkDown}
                        />
                    </div>
                    <div className="col-12">
                        <button 
                            className="btn-save-new-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                            >Lưu
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
