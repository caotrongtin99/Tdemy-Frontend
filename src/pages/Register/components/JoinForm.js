import React, { Component } from 'react';
import { connect } from "react-redux";
import FormField from './FormField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import { Button, Row } from 'antd';
import userActions from '../../../actions/userActions';

class JoinForm extends Component {

    state = { fullname: false, email: false, password: false }

    fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });
    
    emailChanged = this.fieldStateChanged('email');
    fullnameChanged = this.fieldStateChanged('fullname');
    passwordChanged = this.fieldStateChanged('password');

    handleSubmit = () => {
        const {fullname, email, password} = this.state;
        
    }
    render() {
		const { fullname, email, password } = this.state;
		const formValidated = fullname && email && password;

		const validateFullname = value => {
			const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
			if (!regex.test(value)) throw new Error('Fullname is invalid');
		};

        return (
            <div className="form-container d-table-cell position-relative align-middle">
                <form action="/" method="POST" noValidate>
                    <div className="py-5 border-gray border-top border-bottom">
                        <FormField type="text" fieldId="fullname" label="Fullname" placeholder="Enter Fullname" validator={validateFullname} onStateChanged={this.fullnameChanged} required />

                        <EmailField fieldId="email" label="Email" placeholder="Enter Email Address" onStateChanged={this.emailChanged} required />

                        <PasswordField fieldId="password" label="Password" placeholder="Enter Password" onStateChanged={this.passwordChanged} thresholdLength={7} minStrength={3} required />

                        <ConfirmPasswordField fieldId="confirmPassword" label="Confirm Password" placeholder="Enter Confirm Password" onStateChanged={this.passwordChanged} thresholdLength={7} minStrength={3} required />
                        <Row type='flex' justify="center" style={{ marginTop: '20px'}}>
                        <Button type="primary" ghost onClick={this.handleSubmit}>Submit</Button>
                        </Row>
                    </div>

                </form>
            </div>
        );
	}

}

const mapStateToProps = state => ({
    registering: state.registration.registering,
    alert: state.alert
  });

const connectedRegisterPage = connect(mapStateToProps)(JoinForm);
export { connectedRegisterPage as default };
