import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Row } from 'antd';

import { Space } from 'antd';

class NewPasswordField extends Component {


    render() {
        return (
            <Fragment>
                <div className="form-group px-3 pb-2" style={{ marginBottom: '10px' }}>
                    <div className="d-flex flex-row justify-content-between align-items-center" style={{ marginBottom: '4px' }}>
                        <Row>
                            <label className="control-label">New Password</label>
                        </Row>
                        <Row>
                            <Input.Password placeholder="input password" size='large' style={{ width: '250px', lineHeight: '200%' }}/>
                        </Row>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NewPasswordField;