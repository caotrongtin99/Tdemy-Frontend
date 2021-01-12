import React from 'react';
import { Row, Icon, Popconfirm, message, Button, PageHeader, Empty, Col, Result } from 'antd';
import { connect } from 'react-redux';
import { history } from '../../_helpers/history';
import {cartActions} from '../../actions/cartActions';
import { courseActions } from '../../actions/courseActions';

class Cart extends React.Component {
    state = {
        isPurchased: false 
    };
    confirm(itemId) {
        this.props.dispatch(cartActions.removeFromCart(itemId))
        message.success('Remove Successfully');
    }

    cancel(e) {
    }
    calTotal() {
        const { carts } = this.props;
        const total = carts.reduce((acc, cur) => {
            return acc + cur.fee - 0;
        }, 0)
        return total;
    }
    buyNow = () => {
        const {carts} = this.props;
        const courseIds = carts.map(cart => cart.id)
        this.props.dispatch(courseActions.createEnroll(courseIds));
        this.props.dispatch(cartActions.clearCart())
        this.setState({
            isPurchased: true
        })
    }
    render() {
        const { carts } = this.props;
        const { isPurchased } = this.state;
        return (
            <div>
                {
                    !isPurchased ? <div className='cart'>
                        <PageHeader
                            style={{
                                border: '1px solid rgb(235, 237, 240)',
                            }}
                            onBack={() => history.push('/')}
                            title="CART"
                            subTitle=""
                        />
                        <div className="course-list" style={{marginTop: '40px', marginBottom: '100px'}}>
                            {carts.length > 0 ? carts.map(cart => <Row type="flex" justify="space-around" style={{ alignItems: 'center', margin: '10px 10px' }}>
                                <Col span={20}>
                                    <Row type="flex" justify="space-around" style={{ alignItems: 'center', margin: '10px 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '70%', justifyContent: 'start' }}>
                                        <img src={cart.avatar_url} style={{ width: '100px', height: '100px', borderRadius: '4px', marginRight: '20px' }} />
                                        <p style={{ fontSize: "20px", fontWeight: 'bold' }}>{cart.name}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontSize: '18px', marginRight: '20px' }}>${cart.fee}</span>
                                        <Popconfirm
                                            title="Are you sure delete this item?"
                                            onConfirm={() => this.confirm(cart.id)}
                                            onCancel={this.cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a><Icon style={{ color: 'red', fontSize: '20px' }} type="delete" /></a>
                                        </Popconfirm>
                                    </div>
                                    </Row>
                                </Col>
                            </Row>) : <Empty/>}
                        </div>
                        <Row type="flex" justify="center" style={{ marginBottom: '40px', alignItems: 'center'}}>
                            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <div style={{ display: 'flex'}}>
                                    <h5 style={{ fontWeight: 'bold', fontSize: '22px'}}>Total ({carts.length} items)</h5> <h5 style={{ fontWeight: 'bold', fontSize: '22px'}}>: {this.calTotal()}$</h5>
                                </div>
                                <Button type='danger' ghost onClick={this.buyNow}>Buy Now</Button>
                            </Col>
                        </Row>
                    </div> : <Result
                    style={{ margin: '100px 0'}}
                    status="success"
                    title="Successfully Purchased Cloud!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                    <Button type="primary" key="console" onClick={() => history.push('/course/my-courses')}>
                        Go Console
                    </Button>,
                    <Button key="buy" onClick={() => history.push('/')}>Buy Again</Button>,
                    ]} />
                }
                
            </div>    
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    carts: state.cart.carts
})
export default connect(mapStateToProps)(Cart);