import React from 'react';
import { Row, Col, Divider, Avatar, Layout, Button, Upload, Form, Input, Tooltip, Icon, message } from 'antd';
import Career from '../../static/images/Carreer.png';

import './style.css';

import HotCourses from '../../components/HotCourses';

import { connect } from 'react-redux';
import { userActions } from '../../actions/userActions';

import upload from '../../utils/imageUploader';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Account extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        imageUrl: this.props.currentCourse.avatar_url,
        username: '',
        avatar: ''
    };

    componentWillMount() {
        this.state.username = this.props.username;
        this.state.avatar = this.props.avatar;
    }

    handleSubmitUpdateBio = _ => {
        const name = this.props.form.getFieldValue("name");
        const avatar_url = this.state.imageUrl; 
        const { dispatch } = this.props;
        const user = {
            avatar_url, name
        }
        dispatch(userActions.updateUserData(user, this.props.id));
    }

    handleSubmitPassword = _ => {
        const old_password = this.props.form.getFieldValue("current password");
        const new_password = this.props.form.getFieldValue("password");
        //const confirmPassword = this.props.form.getFieldValue("confirm");
        const { dispatch } = this.props;
        const user = {
           old_password,
           new_password,
           email: this.props.email
        }
        dispatch(userActions.updateUserPassword(user));
    };

    handleUploadImage = async (file) => {
        // const image = imageToBase64(file);
        getBase64(file, async (imageURL) => {
            const result = await upload(imageURL);
            this.setState({
                imageUrl: result.url
            })
        })
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {

            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { alert, currentCourse } = this.props;

        const { imageUrl } = this.state;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className='account'>
                <Row style={{ paddingTop: '20px', paddingBottom: '0px', paddingLeft: '200px', paddingRight: '200px' }}>
                    <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar size={140} src={this.props.avatar === '' ? Career : this.props.avatar}></Avatar>
                        <span className="goal" style={{ fontSize: '50px' }}>{this.state.username}</span>
                        <Divider></Divider>
                    </div>
                </Row>
                <Row style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '100px', paddingRight: '200px' }}>
                    <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Form {...formItemLayout}>
                            <Col span={12}>
                                <Form.Item
                                    label={
                                        <span>
                                            Nickname: &nbsp; &nbsp;
                                    </span>
                                    }
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>

                                <Form.Item label="Avatar">
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action={this.handleUploadImage}
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    )}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" onClick={this.handleSubmitUpdateBio}>
                                        Update Bio Info
                                        </Button>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Current">
                                    {getFieldDecorator('current password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your current password!',
                                            }
                                        ],
                                    })(<Input.Password />)}
                                </Form.Item>
                                <Form.Item label="New" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(<Input.Password />)}
                                </Form.Item>
                                <Form.Item label="Confirm" hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            },
                                        ],
                                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout} style={{ paddingTop: '23px' }}>
                                    <Button type="primary" onClick={this.handleSubmitPassword}>
                                        Update Password
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Form>
                        <Divider></Divider>
                    </div>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    currentCourse: state.teacherCourse.data.currentCourse,
    alert: state.alert,
    username: state.authentication.user.name,
    email: state.authentication.user.email,
    avatar: state.authentication.user.avatar_url,
    role: state.userProfile.data.role,
    accessToken: state.authentication.user.accessToken,
    ref_token: state.authentication.user.ref_token,
    id: state.userProfile.data.id
});


const WrappedAccountForm = Form.create({ name: 'account' })(Account);
const connectedAccountPage = connect(mapStateToProps)(WrappedAccountForm);
export { connectedAccountPage as default };
