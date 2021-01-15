import { Col, Row, Select, Pagination, Button } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import queryString from 'query-string';
import _, { constant } from 'lodash';
import { connect } from 'react-redux';
import {config} from '../../_constants/api';
import CourseCard from '../../components/CourseCard';
import moment from 'moment';
require('dotenv').config()
const {API_URL} = config;
const { Option } = Select;

class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseList: [],
            sortByLatest: "",
            sortByPrice: "",
            sortByRating: "desc",
            total: 0,
            page: 1
        };
    }
    componentDidMount = () => {

        const {match, location} = this.props;
        let params = queryString.parse(location.search)
        const {searchKeyword, fee} = this.props;
        console.log(this.props)
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            };
          return fetch(`${API_URL}/api/search?key=${searchKeyword}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
            .then(this.handleResponse)
            .then((res) => {
              this.setState({
                  courseList: res.data.array,
                  total: res.data.totalCount
              })
            });
    }

    componentDidUpdate = (prevProps, prevState, snap) => {
        const {searchKeyword} = this.props;
        if (searchKeyword !== prevProps.searchKeyword) {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
                },
                };
              return fetch(`${API_URL}/api/search?key=${searchKeyword}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  this.setState({
                      courseList: res.data.array,
                      total: res.data.totalCount
                  })
                });
        }
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
    
    handleSortBySelling = () => {
        const {match, location} = this.props;
        let params = queryString.parse(location.search)
        const {key, fee} = this.props;
        this.setState({
            isSortBySelling : !this.state.isSortBySelling
        }, () => {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
                },
                };
              return fetch(`${API_URL}/api/search?key=${key}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  this.setState({
                      courseList: res.data.array
                  })
                });
        })
    }

    handleSortByRating = (value) => {
        const { searchKeyword: key} = this.props;
        this.setState({
            sortByRating : value
        }, () => {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
                },
                };
              return fetch(`${API_URL}/api/search?key=${key}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  this.setState({
                      courseList: res.data.array
                  })
                });
        })
    }

    handleSortByPrice = (value) => {
        const { location} = this.props;
        let params = queryString.parse(location.search)
        const { searchKeyword : key} = this.props;
        this.setState({
            sortByPrice : value
        }, () => {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
                },
                };
              return fetch(`${API_URL}/api/search?key=${key}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                  this.setState({
                      courseList: res.data.array
                  })
                });
        })
    }

    handleSortByLatest = () => {
        this.setState({
            isSortByLatest : !this.state.isSortByLatest
        })
    }

    handleChangePage = (page) => {
        this.setState({
            page: page
        }, ()=> {
            const {match, location} = this.props;
            let params = queryString.parse(location.search)
            const { searchKeyword : key} = this.props;
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
                },
                };
              return fetch(`${API_URL}/api/search?key=${key}&limit=8&offset=${(this.state.page - 1) * 8}&rating=${this.state.sortByRating}&fee=${this.state.sortByPrice}`,requestOptions)
                .then(this.handleResponse)
                .then((res) => {
                    this.setState({
                        courseList: res.data.array,
                        total: res.data.totalCount
                    })
                });
        })
    }

    render() {
        const {courseList} = this.state;
        let formattedCourses = [];
        courseList.forEach(course => {
            const daysAgo = moment(course.createdAt).diff(new Date(), 'd');
            if (daysAgo > -10) {
                Object.assign(course, {isNew: true})
            }
            debugger
            if (course.enroll_count - 0 > 0) {
                debugger
                Object.assign(course, {isBestSeller: true})
            }
            formattedCourses.push(course);
        })
        
        const { searchKeyword: key} = this.props;
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={24} lg={22} style={{ marginTop: '30px' }}>
                        <Row type="flex" justify="space-between" style={{ alignItems: 'center', marginBottom: '20px'}}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{this.state.total} results for {key} </h2>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '20px' }}>Sort by:</span>
                                <Select style={{ width: 160, marginRight: '5px' }} allowClear onChange={this.handleSortByPrice} placeholder="Price">
                                    <Option value="asc">Price: Low To High</Option>
                                    <Option value="desc">Price: High To Low</Option>
                                </Select>
                                <Select style={{ width: 160 }} allowClear onChange={this.handleSortByRating} placeholder="Rating">
                                    <Option value="asc">Rating: Low To High</Option>
                                    <Option value="desc">Rating: High To Low</Option>
                                </Select>
                            </div>
                        </Row>
                        <Row gutter={40}>
                        {
                            formattedCourses.map(course => <Col className="gutter-row" md={6} sm={24} ><CourseCard course={course} isNew={course.isNew} isBestSeller={course.isBestSeller} /></Col>)
                        }
                        </Row>
                        <Row type="flex" justify="center" style={{ marginBottom: '20px'}}>
                            <Pagination defaultCurrent={1} current={this.state.page} onChange={this.handleChangePage} total={this.state.total}/>
                        </Row>

                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({
    loggedIn: state.authentication.loggedIn,
    course: state.teacherCourse.data.currentCourse,
    searchKeyword: state.studentCourse.data.searchKeyword,
    cartItems: state.cart.carts
    })
}

export default connect(mapStateToProps)(SearchPage);