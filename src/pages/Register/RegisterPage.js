import React from 'react';
import { Row, Col } from 'antd';
import JoinForm from './components/JoinForm';
import './style.css';

class RegisterPage extends React.Component {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true,
  };


  render() {
    return (
      <>
      <div className="main-container d-block m-auto">
        <div className="login-form">
          <Row type="flex" justify="center">
            <h1>Register</h1>
          </Row>

          <Row type="flex" justify="center">
            <Col sm={20} md={20} lg={10}>
              <JoinForm />
            </Col>
          </Row>
        </div>
        </div>
      </>
    );
  }
}

export default RegisterPage;
