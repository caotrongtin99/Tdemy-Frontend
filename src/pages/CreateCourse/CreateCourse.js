import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Icon, Row, Col, Input, Button, PageHeader, Select } from 'antd'
import {courseActions} from '../../actions/courseActions'
import { history } from '../../_helpers/history';
import { Steps } from 'antd';
import {config} from '../../_constants/api';
require('dotenv').config()
const {REACT_APP_API_URL} = process.env;
const { Step } = Steps;
const { Option } = Select;

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            name: '',
            categories: [],
            description: '',
            categoryList: []
        }
    }

    componentDidMount = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
            }
        };

        fetch(`${REACT_APP_API_URL}/api/category`, requestOptions)
            .then(async (res) => {
                const data = await this.handleResponse(res);
                const categoryList = data.data.rows;
                this.setState({
                    categoryList
                })
            });
    }

    handleResponse = (response) => {
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

    handleSearch = (e) => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    handleNextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    handleCreateCourse = _ => {
        const course = {
            name: this.state.name,
            category: [this.state.categories],
            short_description: this.state.description,
        }
        this.props.dispatch(courseActions.createCourse(course))
    }

    onChangeCategory (e) {
        this.setState({
            categories: e
        })
    }

    onChangeCourseName(e) {
        this.setState({
            name: e
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e
        })
    }
    render() {
        const { step } = this.state;
        console.log("-=----- this.state.category ======", this.state.categories)
        return (
            <div className='teacher-dashboard'>
                <div className="main-content-teacher-course">
                    <Row type="flex" justify="center" style={{ marginTop: '30px', marginBottom: '100px' }}>
                        <Col span={16}>
                            <Steps current={step}>
                                <Step title="Step 1" description="Course name." />
                                <Step title="Step 2" description="Category." />
                                <Step title="Step 3" description="Description." />
                            </Steps>
                            {step === 0 && <div>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <h1 style={{ fontSize: '30px' }}>How about a working title?</h1>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '14px' }}>It's ok if you can't think of a good title now. You can change it later.</p>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <Col span={14}>
                                        <Input onChange={(e) => this.onChangeCourseName(e.target.value)} placeholder="e.g. Learn ReactJS from A - Z" />
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <Button type="primary" onClick={this.handleNextStep}>Next</Button>
                                </Row>
                            </div>}
                            {step === 1 && <div>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <h1 style={{ fontSize: '30px' }}>What category best fits the knowledge you'll share?</h1>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '14px' }}>If you're not sure about the right category, you can change it later.</p>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <Col span={14}>
                                        <Select mode="multiple" onChange={(value) => this.onChangeCategory(value)} defaultValue={[]} style={{ width: '100%'}}>
                                            {this.state.categoryList.map(category => <Option value={category.name}>{category.name}</Option>)}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <Button type="primary" onClick={this.handleNextStep}>Next</Button>
                                </Row>
                            </div>}
                            {step === 2 && <div>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <h1 style={{ fontSize: '30px' }}>Short Description for the course?</h1>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '14px' }}>It's ok if you can't think of a good title now. You can change it later.</p>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <Col span={14}>
                                        <Input onChange={(e) => this.onChangeDescription(e.target.value)} placeholder="e.g. A beginners guide to learn Machine Learning including Hands on from scratch." />
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <Button type="primary" onClick={this.handleCreateCourse}>Create</Button>
                                </Row>
                            </div>}
                        </Col>
                    </Row>

                </div>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    user: state.userProfile.data,
})
export default connect(mapStateToProps)(CreateCourse);