import React, { Component } from 'react'
import { history } from "../_helpers/history";
import { Layout, Menu, Row, Col, Input, Button, Icon, Popover } from 'antd';
import ReactModalLogin from "react-modal-login";
import logo from '../static/images/logo.svg'
import './Navbar.css';
const { SubMenu } = Menu;
const { Header } = Layout;
const { Search } = Input;
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showModal: false,
            loading: false,
            error: null
        }
    }
    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            error: null
        });
    }

    onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);
    }

    onLoginFail(method, response) {
        console.log("logging failed with " + method);
        this.setState({
            error: response
        });
    }

    startLoading() {
        this.setState({
            loading: true
        });
    }

    finishLoading() {
        this.setState({
            loading: false
        });
    }

    afterTabsChange() {
        this.setState({
            error: null
        });
    }

    render() {
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return (
            <Header className="header" style={{ backgroundColor: '#fff' }}>
                <Row type="flex" style={{ alignItems: 'center' }}>
                    <Col span={16}>
                        <Row type="flex" style={{ alignItems: "center", justifyContent: "start"}}>
                            <img src={logo} style={{ height: '40px' }} alt="" />
                            <Col span={4} style={{ marginLeft: '-100px' }}>
                                <Menu
                                    theme="light"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}
                                >
                                    <SubMenu style={
                                        {
                                            borderBottom: 'unset',
                                            display: 'block'
                                        }
                                    } key="sub2" title={<b><Icon type="appstore" />Categories</b>}>
                                        <Menu.Item key="5">Digital Marketing</Menu.Item>
                                        <Menu.Item key="6">IT - Software</Menu.Item>
                                        <SubMenu key="sub3" title="IT - Software">
                                            <Menu.Item key="7">Mobile Development</Menu.Item>
                                            <Menu.Item key="8">Web Development</Menu.Item>
                                            <Menu.Item key="8">Game Development</Menu.Item>
                                        </SubMenu>
                                        <Menu.Item key="6">Finance</Menu.Item>
                                        <Menu.Item key="6">Design</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Col>
                            <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                                {/* <div class="wrap">
                                    <div class="search">
                                        <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
                                            <button type="submit" class="searchButton">
                                            <Icon type="search" />
                                            </button>
                                    </div>
                                    </div> */}
                                    <Search placeholder="Search for anything" onSearch={value => console.log(value)} enterButton />
                            </Col>
                        </Row>
                    </Col>
                        <Col span={8}>
                            <Row type="flex" justify="end" style={{ alignItems: "center" }}>
                                <Popover content={content} title="Cart">
                                    <Button><Icon style={{ fontSize: '20px' }} type="shopping-cart" /></Button>
                                </Popover>,
                            <Button style={{ marginRight: '10px', marginLeft: '20px' }} type="primary" shape="round" icon="user" size="large">
                                    Login
                            </Button>
                                <Button type="danger" shape="round" icon="user-add" size="large">
                                    Sign Up
                            </Button>
                            </Row>
                        </Col>
                </Row>
                    <ReactModalLogin
                        visible={this.state.showModal}
                        onCloseModal={this.closeModal.bind(this)}
                        loading={this.state.loading}
                        error={this.state.error}
                        tabs={{
                            afterChange: this.afterTabsChange.bind(this)
                        }}
                        loginError={{
                            label: "Couldn't sign in, please try again."
                        }}
                        registerError={{
                            label: "Couldn't sign up, please try again."
                        }}
                        startLoading={this.startLoading.bind(this)}
                        finishLoading={this.finishLoading.bind(this)}
                    />
            </Header>

        )
    }
}

export default Navbar;