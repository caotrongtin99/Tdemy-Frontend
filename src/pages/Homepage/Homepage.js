import React, { Component } from 'react'
import { Button, Carousel, Row, Col } from 'antd';
import './style.css';
import LearnSkill from '../../static/images/LearnSkill.png';
import Career from '../../static/images/Carreer.png';
import Certificate from '../../static/images/certificate.png';
import Organization from '../../static/images/organization.png';
import HotCourses from '../../components/HotCourses';
import { toInteger } from 'lodash';


class HomePage extends Component {

    render() {
        return (
            <div className='homepage'>
                <Carousel autoplay>
                    <div className="banner1 banner">
                        <div style={{ color: 'white' }} className="in-banner">
                            <h2 style={{ fontSize: '60px', color: 'white' }}>
                                Your Course to Success
                            </h2>
                            <p style={{ fontFamily: 'Open Sans', fontSize: '22px', fontWeight: 'bold' }}>
                                Build skills with courses, certificates, and degrees <br /> online from world-class universities and companies
                            </p>
                            <Row>
                                <button type="primary" style={{ fontSize: '22px', padding: '12px 20px 12px 20px', borderRadius: '4px', borderColor: 'transparent', color: '#1890ff', backgroundColor: 'white' }}>
                                    Join for free
                                </button>
                            </Row>
                        </div>
                    </div>
                    {/* <div className="banner2 banner">
                    </div> */}
                </Carousel>,
                <Row style={{ paddingTop: '30px', paddingBottom: '50px' }}>
                    <Row type="flex" justify="center" style={{ marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '32px', fontFamily: 'Open Sans', fontWeight: '700' }}>Achieve your goals with Tdemy</h2>
                    </Row>
                    <Row>
                        <Col md={24} lg={6}>
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={LearnSkill} />
                                <span className="goal">Learn the latest skills</span>
                                <small>like business analytics, graphic design, Python, and more</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6}>
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Career} />
                                <span className="goal">Get ready for a career</span>
                                <small>in high-demand fields like IT, AI and cloud engineering</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6}>
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Certificate} />
                                <span className="goal">Earn a certificate or degree</span>
                                <small>from a leading university in business, computer science, and more</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6}>
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Organization} />
                                <span className="goal">Upskill your organization</span>
                                <small>with on-demand training and development programs</small>
                            </div>
                        </Col>
                    </Row>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>What to learn next</h2>
                    <Row style={{ paddingBottom: '100px'}}>
                    <HotCourses/>
                    </Row>
                    </Col>
                </Row>
            </div>
        )
    };
}

export default HomePage;