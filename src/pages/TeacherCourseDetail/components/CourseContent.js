import { Card, Row, Col, Button, Icon, Upload, message } from 'antd';
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

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleUploadImage = async (file) => {
        console.log("1/ file ===========", file)
        // getBase64(file, async(imageURL) => {
            try{
            const result = await upload(file);
            console.log("=========result===========", result);
            this.setState({
                imageUrl:  result.url
            })
            } catch (err) {
                console.log("errr========",err);
            }
        // })
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
                    </>
                    }>
                        <Upload
                            name="avatar"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.handleUploadImage}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {chapter.url ? <span><Icon type="file-image" /> {chapter.url}</span>: <Button> Add chapter</Button>}
                        </Upload>
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
