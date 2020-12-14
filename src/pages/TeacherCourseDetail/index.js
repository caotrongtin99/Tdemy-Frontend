import React, { Component } from 'react'
import { Icon, Row, Col, Input, Button, PageHeader, Tabs, notification, Form } from 'antd'
import { history } from '../../_helpers/history';
import {connect} from 'react-redux'
import CourseDescription from './components/CourseDescription';
import CourseContent from './components/CourseContent';
import {courseActions} from '../../actions/courseActions';
import { alertActions } from '../../actions/alertActions';
import CoursePlan from './components/CoursePlan';

const { TabPane } = Tabs;

class TeacherCourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            fee : 0,
        }
    }

    componentDidMount = () => {
        const {params: {id}} = this.props.match;
        this.props.dispatch(courseActions.getCourseDetail(id));
        this.props.dispatch(alertActions.clear());
    }

    handleSearch = (e) => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    onChangefee = (e) => {
        this.setState({
            fee : e.target.value - 0
        })
    }

    handleSavePricing = () => {
        const {currentCourse, match} = this.props;
        const course = {
            id: currentCourse.id,
            fee: this.state.fee,
            accessToken: localStorage.getItem('token')
        }
        this.props.dispatch(courseActions.updateCourse(course));

    }
    render() {
        const {currentCourse} = this.props; 

        console.log("=======cur course render ========", currentCourse)
        return (
            <div className='teacher-dashboard'>
                <div className="main-content-teacher-course" style={{ height: '90vh'}}>
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
                        <Tabs tabPosition="left" defaultActiveKey="1">
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="money-collect" />
                                    Info
                                </span>
                            }
                            key="1"
                        >
                            <CoursePlan/>
                            {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <h2>Config fee Course</h2>
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <Form.Item >
                                    {this.props.form,getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                        initialValues: currentCourse.fee
                                    })(
                                        <Input onChange={this.onChangefee} style={{ width: '30%', margin: '30px 0 20px 0'}} prefix="$" suffix="USD" />
                                    )}
                                    </Form.Item>
                                    </Form>
                                <Button onClick={this.handleSavePricing} type="danger" ghost>Save</Button>
                            </div> */}
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                   <Icon type="edit" />
                                    Description
                                </span>
                            }
                            key="2"
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
                            key="3"
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

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    currentCourse: state.teacherCourse.data.currentCourse,
    alert: state.alert
})
export default connect(mapStateToProps)(TeacherCourseDetail);