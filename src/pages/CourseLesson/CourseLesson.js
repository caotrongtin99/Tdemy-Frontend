import { List, Col, Row, Typography, Card, PageHeader, notification, Skeleton, Avatar, Comment, Form, Input, Empty } from 'antd'
import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { courseActions } from '../../actions/courseActions';
import ReactPlayer from 'react-player'
import { history } from '../../_helpers/history';
import { withRouter } from "react-router";
import {config} from '../../_constants/api';
const {API_URL} = config;
class CourseLesson extends Component {
    state = {
        currentChapter: {},
        seek: 0
    };

    componentDidMount = () => {
        const { match } = this.props;
        this.props.dispatch(courseActions.getCourseDetail(match.params.id));
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            };
          return fetch(`${API_URL}/api/courses/${match.params.id}`,requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              const {data} = res;
              if (data.session) {
                const seek = data.session.cur_pos;
                const {chapter_id} = data.session;
                const currentChapter = data.chapters.find(chapter => chapter.id === chapter_id);
                this.setState({
                    currentChapter,
                    seek
                })
              } else {
                  this.setState({
                      currentChapter: data.chapters[0]
                  })
              }
            });
        
    }

    componentWillUnmount = () => {
        const { match } = this.props;
        const {currentChapter} = this.state;
        const currentTime = this.player.getCurrentTime();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            body: JSON.stringify({ position: parseInt(currentTime)}),
            };
          return fetch(`${API_URL}/api/session/${currentChapter.id}`, requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              console.log({res})
            });
    }

    handleResponse(response) {
        return response.text().then((text) => {
          const data = text && JSON.parse(text);
          if (!response.ok) {
            if (response.status === 401) {
              window.location.reload(true);
            }
      
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
      
          return data;
        });
      }

    handlePlayLesson = (chapter) => {
        this.setState({
            seek: 0,
            currentChapter: chapter
        })
    } 

    ref = player => {
        this.player = player
    }

    render() {
        const { currentChapter, seek } = this.state;
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
                                onStart={() => this.player.seekTo(seek,'seconds')}
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