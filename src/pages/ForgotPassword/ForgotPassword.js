import React from 'react';
import { Row, Col, Form, Button, Input, Icon, Checkbox, message } from 'antd';
import {connect} from 'react-redux'
import '../Register/style.css';
import {config} from '../../_constants/api';
require('dotenv').config()
const {REACT_APP_API_URL} = process.env;
class ForgotPassword extends React.Component {
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
            const {email} = values;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json"
                },
                body: JSON.stringify({ email : email }),
                };
              return fetch(`${REACT_APP_API_URL}/api/auth/forgot`, requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  console.log({res})
                  if (res.result === 0) {
                      message.success('Please check your email to reset password!',2)
                  } else {
                      message.error('Fail',2)
                  }
                });
          }
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
    

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className="main-container d-block m-auto">
                    <div style={{ padding: '50px 200px', backgroundColor: 'white', borderRadius: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Row type="flex" justify="center">
                            <h1 style={{ fontSize: '20px' }}>Forgot Password</h1>
                        </Row>
                        <Row type="flex" justify="center" style={{ flexDirection: 'column', fontSize: '14px', alignItems: 'center', fontWeight: 'bold'}}>
                            <p>Enter your user account's verified email address </p>
                            <p>and we will send you a password reset link.</p>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col sm={24} md={24} lg={24}>
                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Item>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your Email!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="email"
                                                placeholder="Email"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Row type="flex" justify="center">
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Send password reset email
                                            </Button>
                                        </Row>
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(ForgotPassword);
const mapStateToProps = (state) => ({
    loggingIn: state.authentication.loggingIn,
    alert: state.alert,
  });
  
const connectedForgotPassword = connect(mapStateToProps)(WrappedNormalLoginForm);
export { connectedForgotPassword as default };
