import React, { Component } from 'react'
import {Icon} from 'antd'
import Nav from './components/Nav'

import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { history } from '../../_helpers/history';

class TeacherDashboard extends Component {


    render() {
        return (
            <div className='teacher-dashboard'>
                {/* <Nav /> */}
                <SideNav
                className="side-nav-teacher"
                >
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                            <Icon type="home" />
                            </NavIcon>
                            <NavText>
                                Home
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon onClick={() => { history.push('/teacher/course')}}>
                            <Icon type="video-camera" />
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="money">
                            <NavIcon>
                            <Icon type="bar-chart" />
                            </NavIcon>
                            <NavText>
                                Money
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <div className="main-content-teacher">
                    <div style={{height: '90vh'}}>
                    </div>
                </div>
            </div>
        )
    };
}

export default TeacherDashboard;