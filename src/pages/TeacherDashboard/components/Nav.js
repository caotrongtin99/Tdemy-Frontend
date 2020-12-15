import React, { Component } from 'react'
import { Layout, Menu, Row, Col, Input, Button, Icon, Popover } from 'antd';

const { Header } = Layout;
class Nav extends Component {
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
                {/* <Row type="flex" style={{ alignItems: 'center' }}>
                    <Col span={16}>
                        
                    </Col>
                        <Col span={8}>
                            <Row type="flex" justify="end" style={{ alignItems: "center" }}>
                                <Popover content={content} title="Cart">
                                    <Button><Icon style={{ fontSize: '20px' }} type="shopping-cart" /></Button>
                                </Popover>,
                            <Button style={{ marginRight: '10px', marginLeft: '20px' }} type="primary" shape="round" icon="user" size="large">
                                    User
                            </Button>
                            </Row>
                        </Col>
                </Row> */}
            </Header>

        )
    }
}

export default Nav;