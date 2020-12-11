import React from 'react';
import { Row, Col, Form, Button, Input, Icon, Checkbox } from 'antd';
import '../Register/style.css';

class LoginPage extends React.Component {
    state = {
        notice: '',
        type: 'tab2',
        autoLogin: true,
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className="main-container d-block m-auto">
                    <div className="login-form">
                        <Row type="flex" justify="center">
                            <h1 style={{ fontSize: '20px' }}>Login</h1>
                        </Row>

                        <Row type="flex" justify="center">
                            <Col sm={20} md={20} lg={10}>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Username"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Password"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(<Checkbox>Remember me</Checkbox>)}
                                        <a className="login-form-forgot" href="">
                                            Forgot password
                                        </a>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                        Or <a href="">register now!</a>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginPage);

export default WrappedNormalLoginForm;
