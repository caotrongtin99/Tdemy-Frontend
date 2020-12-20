import React from 'react';
import { Row, Col, Form, Button, Input, Icon, Checkbox } from 'antd';
import {connect} from 'react-redux'
import '../Register/style.css';
import {userActions} from '../../actions/userActions'

class LoginPage extends React.Component {
    state = {
        notice: '',
        type: 'tab2',
        autoLogin: true,
    };

    handleSubmit = (e) => {
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const {email ,password, isTeacher} = values;
            const accessToken = "abc";
            const refreshToken =" abc";
            dispatch(userActions.login(email, password, accessToken, refreshToken))
                .then(data=> {
                    
                })
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className="main-container d-block m-auto">
                    <div style={{ padding: '50px 200px', backgroundColor: 'white', borderRadius: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Row type="flex" justify="center">
                            <h1 style={{ fontSize: '20px' }}>Login</h1>
                        </Row>

                        <Row type="flex" justify="center">
                            <Col sm={24} md={24} lg={24}>
                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Item>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="email"
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
                                        <Row type="flex" justify="end">
                                        <a className="login-form-forgot" href="">
                                            Forgot password
                                        </a>
                                        </Row>
                                        <Row type="flex" justify="center">
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                        </Row>
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
const mapStateToProps = (state) => ({
    loggingIn: state.authentication.loggingIn,
    alert: state.alert,
  });
  
const connectedLoginPage = connect(mapStateToProps)(WrappedNormalLoginForm);
export { connectedLoginPage as default };
