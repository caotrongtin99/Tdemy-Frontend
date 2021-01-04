import { Col, Row, Select } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import queryString from 'query-string';
import _, { constant } from 'lodash';
import { connect } from 'react-redux';
import {config} from '../../_constants/api';
import CourseCard from '../../components/CourseCard';
const {API_URL} = config;
const { Option } = Select;

class CategoryCourses extends Component {
    state = {
        courseList: [],
        category: ''
    };
    componentDidMount = () => {
        const {match, location} = this.props;
        this.setState({
            category: match.params.category
        })
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            body: JSON.stringify({ type: 'category', value: match.params.category}),
            };
          return fetch(`${API_URL}/api/courses`, requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              debugger
              this.setState({
                  courseList: res.data.array
              })
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
        const {match, location} = this.props;
        const {courseList, category} = this.state;
        let params = queryString.parse(location.search)
        const {key, fee} = params;
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={20} lg={18} style={{ marginTop: '30px' }}>
                        <Row>
                        <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{category} Courses </h2>
                        </Row>
                        <Row type="flex" justify="space-between" style={{ alignItems: 'center'}}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '14px' }}>{courseList.length} results for {category} </h2>
                        </Row>
                        <Row gutter={160}>
                        {
                            courseList.map(course => <Col md={6} sm={24}><CourseCard course={course} /></Col>)
                        }
                        </Row>
                        {/* <p style={{ fontSize: '14px' }}>Filter by:</p> */}

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

export default connect(mapStateToProps)(CategoryCourses);