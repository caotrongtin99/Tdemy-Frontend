import { List, Col, Row, Button, Icon, Card, PageHeader, notification, Skeleton, Avatar, Comment, Form, Input, Empty } from 'antd'
import React, { Component } from 'react'
import '../MyCourses/style.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { courseActions } from '../../actions/courseActions';
import CourseCard from '../../components/CourseCard';


class MyWishList extends Component {
    state = {

    };

    componentDidMount = () => {
        // this.props.dispatch(courseActions.getStudentCourses(this.props.user.id))
        this.props.dispatch(courseActions.getStudentWishList());
    }

    render() {
        const {courses} = this.props;
        return (
            <>
                <Row type="flex" style={{ backgroundColor: '#d7eef7', marginBottom: '30px'}}>
                    <Row type="flex" style={{ width: '100%'}}>
                        <Col span={10} style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent:'start', alignItems: 'center'}}>
                            <div >
                                <h1 style={{ fontFamily: 'Roboto !important', fontSize: '48px', color: '#271066', fontWeight: '700'}}>My WishList</h1>
                            </div>
                        </Col>
                        <Col span={14} style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent:'start', alignItems: 'flex-end'}}>
                            <img src='http://s3.amazonaws.com/coursera_assets/logged-in-home/header-bg-alt_optim.png' />
                        </Col>
                    </Row>
                </Row>
                <Row type="flex" justify="center" style={{ marginBottom: '100px'}}>
                    <Col md={20} lg={18}>
                        {
                            courses.length > 0 ? <List
                            grid={{
                              gutter: 16,
                              xs: 1,
                              sm: 2,
                              md: 2,
                              lg: 3,
                              xl: 3,
                              xxl: 4,
                            }}
                            dataSource={courses}
                            renderItem={course=> (
                              <List.Item>
                                    <CourseCard course={course} match={this.props.match}/>
                              </List.Item>
                            )}
                          /> : <Empty />
                        }
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    courses: state.studentCourse.data.courses,
    user: state.userProfile.data
})

export default connect(mapStateToProps)(MyWishList);