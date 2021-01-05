import { Col, Row, Select, Pagination } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import queryString from 'query-string';
import _, { constant } from 'lodash';
import { connect } from 'react-redux';
import {config} from '../../_constants/api';
import CourseCard from '../../components/CourseCard';
const {API_URL} = config;
const { Option } = Select;

class SearchPage extends Component {
    state = {
        courseList: []
    };
    componentDidMount = () => {
        const {match, location} = this.props;
        let params = queryString.parse(location.search)
        const {key, fee} = params;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            };
          return fetch(`${API_URL}/api/search?key=${key}&limit=10&offset=0`,requestOptions)
            .then(this.handleResponse)
            .then((res) => {
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
        const {courseList} = this.state;
        let params = queryString.parse(location.search)
        const {key, fee} = params;
        return (
            <>
                <Row type="flex" justify="center">
                    <Col md={20} lg={18} style={{ marginTop: '30px' }}>
                        <Row type="flex" justify="space-between" style={{ alignItems: 'center'}}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{courseList.length} results for {key} </h2>
                            {/* <div style={{ display: 'flex', alignItems: 'center'}}>
                                <span style={{ fontSize: '18px', marginRight: '20px' }}>Sort by:</span>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">Rating</Option>
                                    <Option value="lucy">Student</Option>
                                </Select>
                            </div> */}
                        </Row>
                        <Row gutter={160}>
                        {
                            courseList.map(course => <Col className="gutter-row" md={6} sm={24} ><CourseCard course={course} /></Col>)
                        }
                        </Row>
                        <Row type="flex" justify="center" style={{ marginBottom: '20px'}}>
                            <Pagination defaultCurrent={1} total={courseList.length}/>
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

export default connect(mapStateToProps)(SearchPage);