import { Card, Row, Col, Button, Icon, Upload } from 'antd';
import CollectionCreateForm from './CollectionCreateForm';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Typography } from 'antd';

const { Text } = Typography;
class CourseContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapters: [
                // {
                //     id: 1,
                //     title: 'Introduce Course',
                //     url: ''
                // },
                // {
                //     id: 2,
                //     title: 'LifeCycle Hook in Angular',
                //     url: ''
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },                {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // },
                // {
                //     id: 3,
                //     title: 'Two-ways binding in Angular',
                //     url: 'abc.com'
                // }
            ],
            visible: false
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

        const { title, upload} = values;
        const chapters = [...this.state.chapters, {title, url: ''}]
        form.resetFields();
        this.setState(
        { 
            visible: false, 
            chapters
        }
        );
    });
    };

    saveFormRef = formRef => {
    this.formRef = formRef;
    };

    render() {
        const { chapters } = this.state;
        return (
            <Row type="flex" justify="center">
                <Col span={18}>
                    <Row  style={{ marginBottom: '20px'}} type="flex" justify="space-between">
                        <Button type="plus" onClick={this.showModal}>
                            <Icon type="plus" /> Add a chapter
                        </Button>
                        <Button type="plus">
                            <Icon type="save" /> Save
                        </Button>
                    </Row>
                    {chapters.map((chapter, key) => <Card style={{ marginBottom: '15px' }} title={<>
                        <span style={{ fontWeight: 'bold' }}>{`Lesson ${key + 1}: `}</span>
                        <Text editable >{`${chapter.title}`}</Text>
                    </>
                    }>
                        {chapter.url !== '' ? <Upload><span><Icon type="file-image" /> {chapter.url}</span></Upload> :
                            <Upload>
                                <Icon type="upload" /> Upload
                        </Upload>
                        }
                    </Card>)}
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
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
