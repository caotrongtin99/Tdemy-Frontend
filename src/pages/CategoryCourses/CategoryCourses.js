import { Col, Empty, Row, Select, Pagination } from 'antd'
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
        category: '',
        page: 1,
        total: 0
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
          return fetch(`${API_URL}/api/courses?limit=8&offset=0`, requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              this.setState({
                  courseList: res.data.array,
                  total: res.data.count
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

    handleChangePage = (page) => {
        this.setState({
            page: page
        }, () => {
            console.log("==== page===", this.state.page)
            const {match, location} = this.props;
            const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            body: JSON.stringify({ type: 'category', value: match.params.category}),
            };
            debugger
            fetch(`${API_URL}/api/courses?limit=8&offset=${(this.state.page - 1)*8}`, requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              this.setState({
                  courseList: res.data.array
              })
            });
        })
    }

    render() {
        const {courseList, category} = this.state;
        const listCoursesRender = courseList.map(course => <Col md={6} sm={24}><CourseCard course={course} /></Col>)
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={20} lg={18} style={{ marginTop: '30px' }}>
                        <Row>
                        <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{category} Courses </h2>
                        </Row>
                        <Row type="flex" justify="space-between" style={{ alignItems: 'center'}}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '14px' }}>{this.state.total} results for {category} </h2>
                        </Row>
                        <Row gutter={160}>
                        {
                            courseList.length > 0 ?<div>{ listCoursesRender }</div>: <Empty style={{ padding: '100px 0'}}/>
                        }
                        </Row>
                        <Row type="flex" justify="center" style={{ marginBottom: '20px'}}>
                            <Pagination current={this.state.page} pageSize={8} onChange={this.handleChangePage} total={this.state.total}/>
                        </Row>

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