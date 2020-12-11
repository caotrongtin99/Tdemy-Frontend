import React, { Component } from 'react'
import { Icon, Row, Col, Input, Button, PageHeader } from 'antd'
import { history } from '../../_helpers/history';
const { Search } = Input;


class TeacherCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        }
    }
    
    handleSearch = (e) => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    handleClickCourseDetail =(id) => {
        history.push(`/teacher/course/manage/${id}`)
    }
    render() {
        const courses = [
            {
                id: 1,
                name: 'Web Development A - Z',
                avatar: 'https://www.udemy.com/staticx/udemy/images/course/100x100/placeholder.png'
            },
            {
                id: 2,
                name: 'Mobile Development A - Z',
                avatar: 'https://www.udemy.com/staticx/udemy/images/course/100x100/placeholder.png'
            },
            {
                id: 3,
                name: 'ReactJS Zero - Hero',
                avatar: 'https://www.udemy.com/staticx/udemy/images/course/100x100/placeholder.png'
            }
        ]
        return (
            <div className='teacher-dashboard'>
                <div className="main-content-teacher-course">
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        onBack={() => history.push('/teacher')}
                        title="Courses"
                        subTitle="Manage your courses"
                    />,
                    <Row type="flex" justify="center">
                        <Col span={16} style={{ marginTop: '40px', boxShadow: '5px 5px 5px 5px #888888', padding: '10px 30px' }}>
                            <Icon type="safety" /> <span>We're updating the free course experience for students and instructors:</span>
                            <ul>
                                <li>
                                    New free courses (published after March 17, 2020) must have less than 2 hours of video content.
                            </li>
                                <li>
                                    Existing free courses (published before March 17, 2020) that contain more than 2 hours of video content will remain published.
                            </li>
                                <li>
                                    All free courses will only consist of video content and resources. Certificate of completion, Q&A, and direct messaging will only be available for paid enrollments.
                            </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="search-course" type="flex" justify="center" style={{ paddingTop: '10px', marginTop: '30px' }}>
                        <Col span={16}>
                            <Row type="flex" justify="space-between">
                                <Search placeholder="input search text" style={{ width: 350 }} onChange={(value) => this.handleSearch(value)} enterButton />
                                <Button type="danger">New Course</Button>
                            </Row>
                            <div className="course-list" style={{ marginTop: '25px' }}>
                                {courses.map(course => <Row onClick={() => this.handleClickCourseDetail(course.id)} type="flex" className="course" style={{ height: '120px', marginBottom: '15px', cursor: 'pointer' }}>
                                    <img src={course.avatar} height={118} />
                                    <div style={{ padding: '10px 0px 10px 20px' }}>
                                        <h2>{course.name}</h2>
                                    </div>
                                </Row>)}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    };
}

export default TeacherCourse;