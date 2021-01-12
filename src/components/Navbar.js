import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { history } from "../_helpers/history";
import { Layout, Menu, Row, Col, Input, Button, Icon, Popover, Dropdown, Avatar, Badge, Empty } from 'antd';
import ReactModalLogin from "react-modal-login";
import logo from '../static/images/logo.svg'
import {userActions}  from '../actions/userActions'
import './Navbar.css';
import { cartActions } from '../actions/cartActions';
import {config} from '../_constants/api';
const {API_URL} = config;
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
            error: null,
            categoryList: []
        }
    }

    componentDidMount = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
                "x-refresh-token": localStorage.getItem('ref_token')
            }
        };

        fetch(`${API_URL}/api/category/tree`, requestOptions)
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

    onClickSignUp = () => {
        history.push('/register');
    }

    onClickLogin = () => {
        history.push('/login');
    }

    handleClickInfomation = () => {
        history.push('/account')
    }

    handleLogout = () => {
        this.props.dispatch(userActions.logout());
        this.props.dispatch(cartActions.clearCart());
        history.push('/')
    }
    handleSearch = (value) => {
        history.push(`/courses/search?key=${value}`);
        this.props.dispatch({ type: 'saveSearchKeyword', data: value})
    }
    render() {
        const {carts, role} = this.props;
        const content = (
            <div>
                {carts.length > 0 ? carts.map(course => <div style={{ cursor: 'pointer',display: 'flex', justifyContent: "space-between", alignItems: 'center', marginBottom: '5px'}}>
                    <img src={course.avatar_url} style={{width: '45px', height: '45px', marginRight: '20px'}}/>
                    <p >{course.name}</p>
                    <p style={{ marginLeft: '20px'}}>{course.fee}$</p>
                </div>) : <Empty description="Empty Cart"/>}
                <Button style={{ marginTop: '10px'}} type="danger" ghost onClick={()=> history.push('/cart')}>View my cart</Button>
            </div>
        );
        const notifications = (
            <div>
                <Empty description=""/>
            </div>
        );
        const menu = (
            <Menu>
              <Menu.Item key="0" style={{ display: 'flex', alignItems: 'center'}}>
              <Icon type="user" /><a onClick={this.handleClickInfomation}>Your Infomation</a>
              </Menu.Item>
              <Menu.Item key="1" style={{ display: 'flex', alignItems: 'center'}}>
              <Icon type="video-camera" />  <a onClick={()=> history.push('/course/my-courses')}>Your Course</a>
              </Menu.Item>
              <Menu.Item key="3" style={{ display: 'flex', alignItems: 'center'}}>
              <Icon type="heart" /><a onClick={()=> history.push('/course/my-wishlist')}>My Wishlist</a>
              </Menu.Item>
              <Menu.Item key="3"><Icon type="pay-circle" />Payment History</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3" onClick={this.handleLogout}>Log out</Menu.Item>
            </Menu>
          );
        const isLoggedIn = _.get(this.props, 'loggedIn');
        return (
            <Header className="header" style={{ backgroundColor: '#fff' }}>
                <Row type="flex" style={{ alignItems: 'center' }}>
                    <Col span={16}>
                        {   role === "student" &&
                            <Row type="flex" style={{ alignItems: "center", justifyContent: "start" }}>
                                <img src={logo} style={{ height: '40px', cursor:'pointer' }} alt="" onClick={()=> history.push('/')}/>
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
                                            {this.state.categoryList.map(category => {
                                                if (category.subCount === 0) {
                                                    return <Menu.Item onClick={() => history.push(`/category/${category.name}`)} key={category.name}>{category.name}</Menu.Item>
                                                }
                                                return (
                                                    <SubMenu key={category.name} title={category.name} onTitleClick={() => history.push(`/category/${category.name}`)}>
                                                        {category.subCat.map(subCategory=> <Menu.Item onClick={() => history.push(`/category/${subCategory.name}`)} key={subCategory.name}>{subCategory.name}</Menu.Item>)}
                                                    </SubMenu>
                                                )
                                            })}
                                        </SubMenu>
                                    </Menu>
                                </Col>
                                <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Search placeholder="Search for anything" onSearch={(value)=> this.handleSearch(value)} enterButton />
                                </Col>
                            </Row>
                        }
                        {
                            role === "teacher" &&
                            <Row type="flex" style={{ alignItems: "center", justifyContent: "start" }}>
                                <img src={logo} style={{ height: '40px', cursor:'pointer', marginLeft: '30px' }} alt="" onClick={()=> history.push('/teacher')}/>
                            </Row>
                        }
                    </Col>
                    <Col span={8}>
                        {
                            !isLoggedIn ?
                                <Row type="flex" justify="end" style={{ alignItems: "center" }}>
                                    {}
                                    <Popover content={content} title="Cart">
                                        <Button ><Badge count={carts.length}><Icon style={{ fontSize: '20px' }} type="shopping-cart" /></Badge></Button>
                                    </Popover>,
                                    <Button style={{ marginRight: '10px', marginLeft: '20px' }} type="primary" shape="round" icon="user" size="large" onClick={this.onClickLogin}>
                                            Login
                                    </Button>
                                    <Button type="danger" shape="round" icon="user-add" size="large" onClick={this.onClickSignUp}>
                                        Sign Up
                                </Button>
                                </Row> : <Row type="flex" justify="end" style={{ alignItems: 'center'}}>
                                    {role !== "teacher" &&
                                    <Popover content={content} title="Cart">
                                        <Button style={{ marginRight: '15px'}}><Badge count={carts.length}><Icon style={{ fontSize: '20px' }} type="shopping-cart" /></Badge></Button>
                                    </Popover>}
                                    <Popover content={notifications} title="Notification" style={{ marginRight: '20px'}}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '22px'}}><Badge count={1} overflowCount={10}><Icon style={{ fontSize: '20px' }} type="bell" /></Badge></div>
                                    </Popover>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '10px'}}>Hi, {this.props.user.name.split(' ')[0]}</span>
                                    <Dropdown overlay={menu} trigger={['click']} style={{ marginLeft: '15px'}}>
                                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><Icon type="down" />
                                        </a>
                                    </Dropdown>
                                </Row>
                        }
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
const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    carts: state.cart.carts,
    user: state.userProfile.data,
    role: state.userProfile.data.role === 1 ? "teacher" : "student" 
})
export default connect(mapStateToProps)(Navbar);
