import React from 'react';
import { Row, Icon, Popconfirm, message, Upload, PageHeader, Empty } from 'antd';
import { connect } from 'react-redux';
import { history } from '../../_helpers/history';
import {cartActions} from '../../actions/cartActions';

class Cart extends React.Component {
    state = {

    };
    confirm(itemId) {
        debugger
        this.props.dispatch(cartActions.removeFromCart(itemId))
        message.success('Remove Successfully');
    }

    cancel(e) {
    }
    calTotal() {
        const { carts } = this.props;
        const total = carts.reduce((acc, cur) => {
            return acc + cur.price - 0;
        }, 0)
        return total;
    }
    render() {
        const { carts } = this.props;
        return (
            <div className='cart'>
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={cart.avatar} style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
                            <p style={{ fontSize: "20px", fontWeight: 'bold' }}>{cart.name}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', marginRight: '20px' }}>${cart.price}</span>
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
                    </Row>) : <Empty/>}
                </div>
                <Row type="flex" justify="center" style={{ marginBottom: '40px', alignItems: 'center'}}>
                    <h5 style={{ fontWeight: 'bold', fontSize: '22px'}}>Total ({carts.length} items)</h5> <h5 style={{ fontWeight: 'bold', fontSize: '22px'}}>:{this.calTotal()}$</h5>
                </Row>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    carts: state.cart.carts
})
export default connect(mapStateToProps)(Cart);