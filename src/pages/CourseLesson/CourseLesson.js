import { List, Col, Row, Typography, Card, PageHeader, notification, Skeleton, Avatar, Comment, Form, Input, Empty } from 'antd'
import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { courseActions } from '../../actions/courseActions';
import ReactPlayer from 'react-player'
import { history } from '../../_helpers/history';
import { withRouter } from "react-router";

class CourseLesson extends Component {
    state = {
        currentChapter: {}
    };

    componentDidMount = () => {
        const { match } = this.props;
        debugger
        this.props.dispatch(courseActions.getCourseDetail(match.params.id));
    }

    handlePlayLesson = (chapter) => {
        debugger
        this.setState({
            currentChapter: chapter
        })
    } 

    ref = player => {
        this.player = player
    }

    render() {
        const { currentChapter } = this.state;
        const { course } = this.props;
        const chapters = course.chapters;
        return (
            <>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                        backgroundColor: '#d7eef7'
                    }}
                    onBack={() => history.push('/course/my-courses')}
                    title="Learning"
                    subTitle={`${course.name}`}
                />
                <Row style={{ marginBottom: '100px' }}>
                    <Col span={14} >
                        <Row >
                            <ReactPlayer
                                ref={this.ref}
                                controls={true}
                                pip={true}
                                playing
                                width="100%"
                                height="500px"
                                onStart={() => this.player.seekTo(15,'seconds')}
                                url={currentChapter.video_url}
                            />
                        </Row>
                    </Col>
                    <Col style={{ padding: '0 10px'}} span={10}>
                        <List
                            header={<div style={{ fontWeight: 'bold', textAlign: 'center'}}>Course Content</div>}
                            footer={<div style={{ fontWeight: 'bold', textAlign: 'center'}}>END</div>}
                            bordered
                            dataSource={chapters}
                            renderItem={item => (
                                <List.Item style={{ cursor: 'pointer', textAlign: 'center'}} onClick={()=>this.handlePlayLesson(item)}>
                                    <Typography.Text mark={item.id === currentChapter.id}>{item.id === currentChapter.id && '[Playing]'}</Typography.Text> {item.title}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    course: state.teacherCourse.data.currentCourse,
    user: state.userProfile.data
})

export default withRouter(connect(mapStateToProps)(CourseLesson));