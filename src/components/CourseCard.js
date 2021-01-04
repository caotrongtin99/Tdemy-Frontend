import { Card, Popover, Row, Button, Tag, notification, Icon } from 'antd'
import React, { Component } from 'react'
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Heart from "react-animated-heart";
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { cartActions } from '../actions/cartActions';
import { history } from '../_helpers/history';
import rateFormater from '../utils/ratingFormater';
import { courseActions } from '../actions/courseActions';

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInWishList: this.props.course.isInWishList
        }
    }

    componentDidMount = () => {
        if (this.props.isLoggedIn){
            const {user} = this.props;
            this.props.dispatch(courseActions.getStudentCourses(user.id))
        }
    }

    addToCard = (course) => {
        const {myCourses} = this.props;
        const {carts} = this.props;
        const isExist = carts.find(cart => cart.id === course.id)
        if (isExist) {
            notification.error({
                message: 'Error!',
                description: 'You had it in the cart'
            })
        } else {
            this.props.dispatch(cartActions.addToCart(course));
            notification.success({
                message: 'Cart Notification',
                description: 'This course has been added to the cart!'
            })
        }
    }

    handleAddWishList = (course) => {
        const a = this.props.isLoggedIn;
        if (this.props.isLoggedIn) {
            this.props.dispatch(courseActions.addToWishList(course.id))
        } else {
            notification.warning({
                message: 'Login Required!',
                description: 'Please login to add course to wishlist!'
            })
        }
    }

    async handleViewDetail(course) {
        const { match} = this.props;
        const isMyCoursesPage = _.get(match, 'path') === "/course/my-courses";
        isMyCoursesPage ? history.push(`/course/my-courses/${course.id}`) : history.push(`/course/${course.id}`)
    }

    render() {
        const { course, isBestSeller, match} = this.props;
        const isMyCoursesPage = _.get(match, 'path') === "/course/my-courses";
        const isWishlistPage = _.get(match, 'path') === "/course/my-wishlist";
        const content = (
            <div>
                <h2 style={{ fontWeight: 'bold' }}>{course.name}</h2>
                <Tag color="magenta">{course.category}</Tag>
                {!isMyCoursesPage && <Row type="flex" style={{ alignItems: "center" }}>
                    <Button type="danger" danger onClick={() => this.addToCard(course)}>
                        Add to cart
                    </Button>
                    <Heart isClick={this.state.isInWishList} onClick={() => this.handleAddWishList(course)} />
                    {isWishlistPage && <Icon style={{ fontSize: '26px', color: 'red'}} type="delete" />}
                </Row>}
            </div>
        );
        return (
            <>
                <Popover content={content} placement="right">
                    <div onClick={() => this.handleViewDetail(course)}>
                        <Card
                            hoverable
                            style={{ width: 300 }}
                            // onClick={this.handleViewDetail(course)}
                            cover={<img alt="example" style={{width: '298px', height: '200px'}} src={course.avatar_url} />}
                        >
                            <h4>{course.name}</h4>{isBestSeller &&  <Tag color="red">Best Seller</Tag>}
                            <p>{course.author}</p>
                            <Rate
                                count={5}
                                defaultValue={rateFormater(course.rate) || 0}
                                allowHalf={true}
                                disabled
                            />,
                    </Card>,
                    </div>
                </Popover>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.authentication.loggedIn,
    carts: state.cart.carts,
    user: state.authentication.user,
    myCourses: state.studentCourse.data.myCourses
})

export default withRouter(connect(mapStateToProps)(CourseCard));