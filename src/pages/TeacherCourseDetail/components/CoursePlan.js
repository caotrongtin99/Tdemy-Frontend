import React, { Component } from 'react'
import { Icon, Row, notification, Input, Button, Form, Space } from 'antd'
import { alertActions } from '../../../actions/alertActions';
import { courseActions } from '../../../actions/courseActions';

import { connect } from 'react-redux'

const { Search } = Input;
let id = 0;

class CoursePlan extends Component {
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
                    accessToken: localStorage.getItem('token')
                }
                this.props.dispatch(courseActions.updateCourse(course));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { alert, currentCourse } = this.props;
        console.log("============current course =========", currentCourse)
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                {this.props.alert.type && notification.success({
                    title: 'Update',
                    description: 'Update fee course successfully!'
                })}
                <Form.Item >
                    {this.props.form, getFieldDecorator('fee', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: currentCourse.fee
                    })(
                        <Input onChange={this.onChangefee} style={{ width: '300px', margin: '30px 0 20px 0' }} prefix="$" suffix="USD" />
                    )}
                </Form.Item>
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