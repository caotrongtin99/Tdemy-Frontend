import React from 'react';
import { Row, Col, Divider, Avatar, Layout, Button, Upload } from 'antd';
import Career from '../../static/images/Carreer.png';
import InfoForm from './components/InfoForm';
import './style.css';

import HotCourses from '../../components/HotCourses';


class Account extends React.Component {
    state = {
       
    };

    render() {
        
        return (
            <div className='account'>
                <Row style={{ paddingTop: '20px', paddingBottom: '0px', paddingLeft: '200px', paddingRight: '200px' }}>
                    <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Upload><Avatar size={140} src={Career}></Avatar></Upload>
                        <span className="goal" style={{ fontSize: '50px' }}>Ben Dover</span>
                        <Divider></Divider>
                    </div>
                </Row>
                <Row style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '200px', paddingRight: '200px' }}>
                    <div className="card-achieve" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <InfoForm></InfoForm>
                        <Divider></Divider>
                    </div>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>My Watch List</h2>
                    <Row style={{ paddingBottom: '100px'}}>
                    <HotCourses/>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={22} style={{ margin: '0 auto'}}>
                    <h2 style={{ fontSize: '32px', color: '#3c3b37', fontWeight:'800'}}>Courses I have taken</h2>
                    <Row style={{ paddingBottom: '100px'}}>
                    <HotCourses/>
                    </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Account;