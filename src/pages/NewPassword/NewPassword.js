import React from 'react';
import { Row, Col, Form, Button, Input, Icon, Result, notification } from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import queryString from 'query-string';
import {history} from '../../_helpers/history';
import '../Register/style.css';
import {config} from '../../_constants/api';
require('dotenv').config()
const {REACT_APP_API_URL} = process.env;
class NewPassword extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        hasResult: false
      };
    
      handleSubmit = e => {
        const {dispatch, match, location} = this.props;
        let params = queryString.parse(location.search)
        const {code} = params;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            
            const {password} = values;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json"
                },
                body: JSON.stringify({ password : password }),
                };
              return fetch(`${REACT_APP_API_URL}/api/auth/confirm?code=${code}`, requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  if (res.result === 0) {
                    this.setState({
                        hasResult: true
                    })
                  } else {
                      notification.error({
                          message: 'Error',
                          description: 'Something was wrong!'
                      })
                  }
                });
          }
        });
      };

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
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
      handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const { hasResult } = this.state;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        return (
          <Row style={{ marginTop: '100px'}} type="flex" justify="center">
            <Col lg={10} md={14} sm={20} style={{ display: hasResult ? 'none' : 'block'}}>
              <div style={{ padding: '50px 100px',backgroundColor: 'white', borderRadius: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>   
              <h3 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Change Password</h3>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
              </Button>
                </Form.Item>
              </Form>
              </div>
            </Col>
            <div style={{ display: hasResult ? 'block' : 'none' }}>
                <Result
                    status="success"
                    title="Successfully Reset Password!"
                    extra={[
                    <Button type="primary" key="console" onClick={()=> history.push('/login')}>
                        Go Login Page
                    </Button>
                    ]}
                />
            </div>
          </Row>
        );
      }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NewPassword);
const mapStateToProps = (state) => ({
    loggingIn: state.authentication.loggingIn,
    alert: state.alert,
  });
  
const connectedNewPassword = withRouter(connect(mapStateToProps)(WrappedNormalLoginForm));
export { connectedNewPassword as default };
