import React, { Component } from 'react';

import NameField from './NameField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import NewPasswordField from './NewPasswordField';

import { Button, Row, Col, Divider } from 'antd';

class InfoForm extends Component {
    state = { fullname: false, email: false, password: false }

    fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });

    emailChanged = this.fieldStateChanged('email');
    fullnameChanged = this.fieldStateChanged('fullname');
    passwordChanged = this.fieldStateChanged('password');

    render() {
        const { fullname, email, password } = this.state;
        const formValidated = fullname && email && password;

        const validateFullname = value => {
            const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
            if (!regex.test(value)) throw new Error('Fullname is invalid');
        };

        return (
            <div className="form-container d-table-cell position-relative align-middle">
                <Col span={8}>
                    <form action="/" method="POST" noValidate>
                        <Row>
                            <div className="py-5 border-gray border-top border-bottom">
                                <NameField type="text" fieldId="fullname" label="Fullname" placeholder="Fullname" defaultValue="Ben Dover" validator={validateFullname} onStateChanged={this.fullnameChanged} required></NameField>
                                <Row type='flex' justify="center" style={{ marginTop: '20px' }}></Row>
                                <EmailField fieldId="email" label="Email" placeholder="Enter Email Address" defaultValue="abc@gmail.com" onStateChanged={this.emailChanged} required></EmailField>
                            </div>
                        </Row>
                        <Row type='flex' justify="center" style={{ marginTop: '40px' }}>
                            <Button type="primary" ghost>Update Info</Button>
                        </Row>
                    </form>
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                    <form action="/" method="POST" noValidate>
                        <Row>
                            <div className="py-5 border-gray border-top border-bottom">
                                <PasswordField></PasswordField>
                                <Row type='flex' justify="center" style={{ marginTop: '20px' }}></Row>
                                <NewPasswordField></NewPasswordField>
                                <Row type='flex' justify="center" style={{ marginTop: '20px' }}></Row>
                                <ConfirmPasswordField></ConfirmPasswordField>
                            </div>
                        </Row>
                        <Row type='flex' justify="center" style={{ marginTop: '40px' }}>
                            <Button type="primary" ghost>Change Password</Button>
                        </Row>
                    </form>
                </Col>
            </div>
        );
    }
}

export default InfoForm;