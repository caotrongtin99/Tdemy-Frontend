import React, { Component } from 'react'
import { Icon, Row, notification, Input, Button, Form, Upload, message } from 'antd'
import { alertActions } from '../../../actions/alertActions';
import { courseActions } from '../../../actions/courseActions';
import upload from '../../../utils/imageUploader'
import { connect } from 'react-redux'
const imageToBase64 = require('image-to-base64');

const { Search } = Input;
let id = 0;
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

class CoursePlan extends Component {
    state = {
        imageUploading: false,
        imageUrl: 'https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    }
    componentDidMount = () => {
        // const { params: { id } } = this.props.match;
        this.props.dispatch(alertActions.clear());
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { fee } = values;
                const { currentCourse, match } = this.props;
                const course = {
                    id: currentCourse.id,
                    fee: fee - 0,
                }
                this.props.dispatch(courseActions.updateCourse(course));
            }
        });
    };

    handleUploadImage = async (file) => {
        const image = imageToBase64(file);
        getBase64(file, async(imageURL) => {
            const result = await upload(imageURL);
            this.setState({
                imageUrl:  result.url
            })
        })
    }

    handleChange = info => {
        debugger
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
            debugger
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { alert, currentCourse } = this.props;
        const {imageUrl} = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.imageUploading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                {this.props.alert.type && notification.success({
                    title: 'Update',
                    description: 'Update fee course successfully!'
                })}
                <Row>
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
                </Row>
                <Row>
                    <Form.Item >
                        {this.props.form, getFieldDecorator('fee', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            initialValue: currentCourse.fee
                        })(
                            <Input onChange={this.onChangefee} style={{ width: '300px', margin: '30px 0 20px 0' }} prefix="$" suffix="USD" />
                        )}
                    </Form.Item>
                </Row>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form>
        );
    }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(CoursePlan);
const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    currentCourse: state.teacherCourse.data.currentCourse,
    alert: state.alert
})
export default connect(mapStateToProps)(WrappedHorizontalLoginForm);