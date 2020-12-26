import { Card, Row, Col, Button, Icon, E, message } from 'antd';
import CollectionCreateForm from './CollectionCreateForm';
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Typography } from 'antd';
import { courseActions } from '../../../actions/courseActions';
import upload from '../../../utils/videoUploader'

const credentials = require('../../../static/js/credentials.json');


const { Text } = Typography;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = 1;
    const isLt2M = file.size / 1024 / 1024 < 200;
    if (!isLt2M) {
      message.error('Image must smaller than 200MB!');
    }
    return isJpgOrPng && isLt2M;
  }

class CourseContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',

        };
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const { title, upload } = values;
            const chapter = { title, courseId: this.props.currentCourse.id }
            form.resetFields();
            this.props.dispatch(courseActions.createChapter(chapter));
            this.setState({ visible: false })
        });
    };

    onChangeTitle = (e, currentChapter) => {
        const chapter = {
            id: currentChapter.id,
            title: e,
            courseId: currentChapter.course_id
        }
        this.props.dispatch(courseActions.updateChapter(currentChapter.course_id, chapter))
    }

    updateChapterStatus = (curStatus, currentChapter) => {
        const chapter = {
            id: currentChapter.id,
            status: curStatus === 0 ? 1 : 0,
            courseId: currentChapter.course_id
        }
        this.props.dispatch(courseActions.updateChapter(currentChapter.course_id, chapter))
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    uploadVideo = async (e, currentChapter) => { 
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'blqkxy0o')
        const res = await fetch("https://api.cloudinary.com/v1_1/dmdtwsdi7/upload", { method: 'POST', body: data }) 
        const a = await this.handleResponse(res);
        const chapter = {
            id: currentChapter.id,
            video_url: a.secure_url,
            courseId: currentChapter.course_id
        }
        this.props.dispatch(courseActions.updateChapter(currentChapter.course_id, chapter))
    }
    handleResponse(response) { 
        return response.text().then((text) => { 
            const data = text && JSON.parse(text); 
            if (!response.ok) { if (response.status === 401) { 
                window.location.reload(true); 
            }
            const error = (data && data.message) || response.statusText; 
            return Promise.reject(error); 
        } 
        return data; 
        }); 
    }

    render() {
        const { chapters } = this.props.currentCourse;
        return (
            <Row type="flex" justify="center">
                <Col span={18}>
                    <Row style={{ marginBottom: '20px' }} type="flex" justify="space-between">
                        <Button type="plus" onClick={this.showModal}>
                            <Icon type="plus" /> Add a chapter
                        </Button>
                        <Button type="plus">
                            <Icon type="save" /> Save
                        </Button>
                    </Row>
                    {chapters.map((chapter, key) => <Card style={{ marginBottom: '15px' }} title={<>
                        <span style={{ fontWeight: 'bold' }}>{`Lesson ${key + 1}: `}</span>
                        <Text editable={{ onChange: (e) => this.onChangeTitle(e, chapter) }} >{`${chapter.title}`}</Text>
                        <Button style={{ marginLeft: '30px'}} onClick={() => this.updateChapterStatus(chapter.status, chapter)}>{chapter.status === 0 ? 'Make Private' : 'Make Public'}</Button>
                    </>
                    }>
                        {chapter.video_url && <Icon type="file-image" />} <p> {chapter.video_url}</p> <input type="file" placeholder="choose video" name="file" onChange={(e) => this.uploadVideo(e, chapter)} />
                    </Card>)}
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        uploadVideo={this.uploadVideo}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    currentCourse: state.teacherCourse.data.currentCourse,
    alert: state.alert
})
export default connect(mapStateToProps)(CourseContent);
