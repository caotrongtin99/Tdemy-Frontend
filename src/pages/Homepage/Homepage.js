import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import { Button, Carousel, Row, Col } from 'antd';
import './style.css';
import LearnSkill from '../../static/images/LearnSkill.png';
import Career from '../../static/images/Carreer.png';
import Certificate from '../../static/images/certificate.png';
import Organization from '../../static/images/organization.png';
import HotCourses from '../../components/HotCourses';
import { courseActions } from '../../actions/courseActions';
import MostViewCourses from '../../components/MostViewCourses';
import NewCourses from '../../components/NewCourses';
import {config} from '../../_constants/api';
import { history } from '../../_helpers/history';
const {API_URL} = config;
class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            hotCategories: [],
            hotCourses: [],
            newCourses: []
        };
    }
    componentDidMount = async () => {
        this.props.dispatch(courseActions.getMostViewCourses());
        this.props.dispatch(courseActions.getStudentWishList());
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
            },
            };
        fetch(`${API_URL}/api/category`,requestOptions)
            .then(this.handleResponse)
            .then((res) => {
                this.setState({
                    hotCategories: res.data.rows
                })
            });
        const res = await axios.post(`${API_URL}/api/courses`, {
            type: 'enroll'
            }, {
            headers: {
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
        }})

        const resNewCourses = await axios.post(`${API_URL}/api/courses`, {
            type: 'ẻnoll'
            }, {
            headers: {
            "x-access-token": localStorage.getItem('token'),
            "x-refresh-token": localStorage.getItem('ref_token')
        }})
        this.setState({
            hotCourses: res.data.data.array,
            newCourses: resNewCourses.data.data.array
        })

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
        console.log(this.state.hotCategories)
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
                    <div className="banner2 banner">
                        <div style={{ color: 'white' }} className="in-banner">
                            <h2 style={{ fontSize: '60px', color: 'white' }}>
                                Aspire for more
                            </h2>
                            <p style={{ fontFamily: 'Open Sans', fontSize: '22px', fontWeight: 'bold' }}>
                                Learning keeps you in the lead. Get in-demand skills to impress anyone.
                            </p>
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
                        <Col md={24} lg={6} className="card-intro">
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={LearnSkill} />
                                <span className="goal">Learn the latest skills</span>
                                <small>like business analytics, graphic design, Python, and more</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6} className="card-intro">
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Career} />
                                <span className="goal">Get ready for a career</span>
                                <small>in high-demand fields like IT, AI and cloud engineering</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6} className="card-intro">
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Certificate} />
                                <span className="goal">Earn a certificate</span>
                                <small>From a leading university in business, computer science</small>
                            </div>
                        </Col>
                        <Col md={24} lg={6} className="card-intro">
                            <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img className="img-achieve" src={Organization} />
                                <span className="goal">Upskill organization</span>
                                <small>With on-demand training and development programs</small>
                            </div>
                        </Col>
                    </Row>
                </Row>
                {/* <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>What to learn next</h2>
                    <Row style={{ paddingBottom: '100px'}}>
                        <HotCourses/>
                    </Row>
                    </Col>
                </Row> */}
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>Featured Categories</h2>
                    <Row style={{ paddingBottom: '40px'}} gutter={30}>
                        {this.state.hotCategories.map(category => <Col span={6} >
                            <div onClick={()=> history.push(`/category/${category.name}`)} className="category-card" style={{border: '1px solid #dcdacb', borderRadius: '4px', color: '#0f7c90', padding: '18px 0', margin: '5px 5px', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px'}}>{category.name}</p>
                            </div>
                        </Col>)}
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>Most View Courses</h2>
                    <Row style={{ paddingBottom: '40px'}}>
                        <MostViewCourses/>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>New Courses</h2>
                    <Row style={{ paddingBottom: '40px'}}>
                        <NewCourses courses={this.state.newCourses}/>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>Hot Courses</h2>
                    <Row style={{ paddingBottom: '100px'}}>
                        <HotCourses courses={this.state.hotCourses}/>
                    </Row>
                    </Col>
                </Row>
            </div>
        )
    };
}
const mapStateToProps = state => ({
    user: state.userProfile.data
})

export default connect(mapStateToProps)(HomePage);