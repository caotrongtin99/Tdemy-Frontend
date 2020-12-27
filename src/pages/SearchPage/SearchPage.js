import { Col, Row, Select } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import _ from 'lodash';
import { connect } from 'react-redux';
const { Option } = Select;

class SearchPage extends Component {
    state = {

    };

    render() {
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={20} lg={18} style={{ marginTop: '30px' }}>
                        <Row type="flex" justify="space-between" style={{ alignItems: 'center'}}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>1000 results for 'ReactJS'</h2>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <span style={{ fontSize: '18px', marginRight: '20px' }}>Sort by:</span>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Rating</Option>
                                    <Option value="lucy">Student</Option>
                                </Select>
                            </div>
                        </Row>
                        <p style={{ fontSize: '14px' }}>Filter by:</p>

                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    course: state.teacherCourse.data.currentCourse,
    cartItems: state.cart.carts
})

export default connect(mapStateToProps)(SearchPage);