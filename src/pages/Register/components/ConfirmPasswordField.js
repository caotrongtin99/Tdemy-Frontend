import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import FormField from './FormField';

class ConfirmPasswordField extends Component {

	constructor(props) {
		super(props);
		const { minStrength = 3, thresholdLength = 7 } = props;

		this.minStrength = typeof minStrength === 'number'
			? Math.max( Math.min(minStrength, 4), 0 )
			: 3;

		this.thresholdLength = typeof thresholdLength === 'number'
			? Math.max(thresholdLength, 7)
			: 7;

		this.state = { confirmPassword: '', strength: 0 };
	}

	stateChanged = state => {
		this.setState({
			confirmPassword: state.value,
			strength: zxcvbn(state.value).score
		}, () => this.props.onStateChanged(state));
	};

	validatePasswordStrong = value => {
		if (value.length <= this.thresholdLength) throw new Error("Password is short");
		if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
	};

	render() {
		const { type, validator, onStateChanged, children, ...restProps } = this.props;
		const { confirmPassword, strength } = this.state;

		const passwordLength = confirmPassword.length;

		return (
            <Fragment>
				<div className="position-relative">
                    <FormField type="password" onStateChanged={this.stateChanged} {...restProps}>
                    </FormField>
                </div>
            </Fragment>
		);
    }
}

ConfirmPasswordField.propTypes = {
	label: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	required: PropTypes.bool,
	children: PropTypes.node,
	onStateChanged: PropTypes.func,
	minStrength: PropTypes.number,
	thresholdLength: PropTypes.number
};

export default ConfirmPasswordField;
