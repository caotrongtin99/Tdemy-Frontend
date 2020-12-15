import { Card, Popover, Row, Button, Tag, notification } from 'antd'
import React, { Component } from 'react'
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Heart from "react-animated-heart";
import _ from 'lodash';
import { connect } from 'react-redux';
import {cartActions} from '../actions/cartActions';
import { history } from '../_helpers/history';

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInWishList : this.props.course.isInWishList
        }
    }

    addToCard = (course) => {
        this.props.dispatch(cartActions.addToCart(course));
        notification.success({
            message: 'Cart Notification',
            description: 'This course has been added to the cart!'
        })
    }

    handleAddWishList = (course) => {
        debugger
        if (this.props.isLoggedIn) {
            debugger
            this.setState({
                isInWishList: !this.state.isInWishList
            })
        } else {
            notification.warning({
                message: 'Login Required!',
                description: 'Please login to add course to wishlist!'
            })
        }
    }
    render() {
        const { course } = this.props;
        const content = (
            <div>
                <h2 style={{ fontWeight: 'bold' }}>{course.name}</h2>
                <Tag color="magenta">{course.category}</Tag>
                <Row type="flex" style={{ alignItems: "center"}}>
                    <Button type="danger" danger onClick={() => this.addToCard(course)}>
                        Add to cart
                    </Button>
                    <Heart isClick={this.state.isInWishList} onClick={() => this.handleAddWishList(course)} />
                </Row>
            </div>
        );
        return (
            <>
                <Popover content={content} placement="right">
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src={course.avatar} />}
                    >
                        <h4>{course.name}</h4>
                        <p>{course.author}</p>
                        <Rate
                            count={5}
                            defaultValue={course.rating}
                            allowHalf={true}
                            disabled
                        />,
                    </Card>,
                </Popover>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
})

export default connect(mapStateToProps)(CourseCard);