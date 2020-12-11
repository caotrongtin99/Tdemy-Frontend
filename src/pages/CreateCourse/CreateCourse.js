import React, { Component } from 'react'
import { Icon, Row, Col, Input, Button, PageHeader, Select } from 'antd'
import { history } from '../../_helpers/history';
import { Steps } from 'antd';

const { Step } = Steps;
const { Option } = Select;

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        }
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
    render() {
        const { step } = this.state;
        return (
            <div className='teacher-dashboard'>
                <div className="main-content-teacher-course">
                    <Row type="flex" justify="center" style={{ marginTop: '30px' }}>
                        <Col span={16}>
                            <Steps current={step}>
                                <Step title="Step 1" description="Course name." />
                                <Step title="Step 2" description="Category." />
                                <Step title="Waiting" description="This is a description." />
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
                                        <Input placeholder="e.g. Learn ReactJS from A - Z" />
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
                                        <Select defaultValue="Game Development" style={{ width: '100%'}}>
                                            <Option value="Mobile Development">Mobile Development</Option>
                                            <Option value="Web Development">Web Development</Option>
                                            <Option value="Game Development">Game Development</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <Button type="primary" onClick={this.handleNextStep}>Next</Button>
                                </Row>
                            </div>}
                            {step === 2 && <div>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <h1 style={{ fontSize: '30px' }}>What category best fits the knowledge you'll share?</h1>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '14px' }}>If you're not sure about the right category, you can change it later.</p>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '60px' }}>
                                    <Col span={14}>
                                        <Select defaultValue="Game Development" style={{ width: '100%'}}>
                                            <Option value="Mobile Development">Mobile Development</Option>
                                            <Option value="Web Development">Web Development</Option>
                                            <Option value="Game Development">Game Development</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
                                    <Button type="primary" onClick={this.handleNextStep}>Create</Button>
                                </Row>
                            </div>}
                        </Col>
                    </Row>

                </div>
            </div>
        )
    };
}

export default CreateCourse;