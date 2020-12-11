import React, { Component } from 'react'
import { Icon, Row, Col, Input, Button, PageHeader, Tabs } from 'antd'
import { history } from '../../_helpers/history';
import CoursePlan from './components/CoursePlan';
import CourseDescription from './components/CourseDescription';
import CourseContent from './components/CourseContent';
const { TabPane } = Tabs;
const { Search } = Input;


class TeacherCourseDetail extends Component {
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
    render() {
        return (
            <div className='teacher-dashboard'>
                <div className="main-content-teacher-course">
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        onBack={() => history.push('/teacher/course')}
                        title="Courses"
                        subTitle="Manage your courses"
                    />,
                    <Row type="flex" justify="center">
                        <Col span={22}>
                        <Tabs tabPosition="left" defaultActiveKey="2">
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="apple" />
                                    Plan
                                </span>
                            }
                            key="1"
                        >
                            <CoursePlan />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="money-collect" />
                                    Pricing
                                </span>
                            }
                            key="2"
                        >
                            Tab 2
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                   <Icon type="edit" />
                                    Description
                                </span>
                            }
                            key="3"
                        >
                            <CourseDescription />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="book" />
                                    Content
                                </span>
                            }
                            key="4"
                        >
                             <CourseContent />
                        </TabPane>
                    </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    };
}

export default TeacherCourseDetail;