import { List, Col, Row, Button, Icon, Typography, PageHeader, notification, Skeleton, Avatar, Comment, Form, Input } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import _ from 'lodash';
import { connect } from 'react-redux';


class SearchPage extends Component {
    state = {

    };

    render() {
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={20} lg={18} style={{ marginTop: '30px'}}>
                        <h2 style={{ fontWeight: 'bold', fontSize: '25px'}}>1000 results for 'ReactJS'</h2>
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