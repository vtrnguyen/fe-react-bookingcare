import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManageClinic.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
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

    handleSaveNewClinic = async () => {
        let { name, address, imageBase64, descriptionHTML, descriptionMarkDown } = this.state;
        if (!name || !address || !imageBase64 || !descriptionHTML || !descriptionHTML) {
            toast.error('Missing input parameter!!!');
            return;
        }

        let res = await createNewClinic({
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkDown,
        });

        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkDown: '',
            });
            toast.success('Add new clinic success!');
        } else {
            toast.error('Add new clinic does not success!!!');
        }
    }

    render() {
        return (
            <div className="manage-clinic-container">
                <div className="manage-clinic-title">
                    <FormattedMessage id="manage-clinic.title"/>
                </div>
                
                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.label-name-input"/>
                        </label>
                        <input 
                            className="form-control" 
                            type="text"
                            value={this.state.specialtyNameVi}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.label-image-input"/>
                        </label>
                        <input 
                            className="form-control-file" 
                            type="file"
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.label-address-input"/>
                        </label>
                        <input 
                            className="form-control" 
                            type="text"
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
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
                            className="btn-save-new-clinic"
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            <FormattedMessage id="manage-clinic.btn-save"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
