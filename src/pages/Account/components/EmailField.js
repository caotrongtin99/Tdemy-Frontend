import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Row } from 'antd';
import NameField from './NameField'
import { validate } from 'isemail';

const EmailField = props => {
	const { type, validator, ...restProps } = props;

	const validateEmail = value => {
		if (!validate(value)) throw new Error('Email is invalid');
	};

	return <NameField type="text" validator={validateEmail} {...restProps} />

    // render() {
    //     return(
    //         <Fragment>
	// 			<div className="form-group px-3 pb-2" style={{ marginBottom: '10px'}}>
	// 				<div className="d-flex flex-row justify-content-between align-items-center" style={{ marginBottom: '4px'}}>
	// 					<Row>
	// 						<label className="control-label">Email</label>
	// 					</Row>
	// 					<Row>
	// 						<Input defaultValue='abc@xyz.com' size='large' style={{ width: '250px', lineHeight: '200%' }}></Input>
	// 					</Row>
	// 				</div>
	// 			</div>
	// 		</Fragment>
    //     );
    // }
};

EmailField.propTypes = {
	label: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	required: PropTypes.bool,
	children: PropTypes.node,
	onStateChanged: PropTypes.func,
	defaultValue: PropTypes.string.isRequired
};

export default EmailField;