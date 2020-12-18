import { Card, Popover, Row, Button, Icon, Typography, PageHeader, notification } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import Rate from 'rc-rate';
import Heart from "react-animated-heart";
import _ from 'lodash';
import { connect } from 'react-redux';
import { courseActions } from '../../actions/courseActions';
import { cartActions } from '../../actions/cartActions';
const { Paragraph } = Typography;

class CourseDetail extends Component {
    componentDidMount = () => {
        const {match} = this.props;
        this.props.dispatch(courseActions.getCourseDetail(match.params.id))
    }

    handleAddToCart = (course) => {
        let isExist = false;
        this.props.cartItems.forEach(item => {
            if (item.id === course.id) {
                isExist = true;
                return;
            }
        })
        debugger
        !isExist ? this.props.dispatch(cartActions.addToCart(course)) : notification.error({ message: 'Cart Notification', description: 'The course already exists in the shopping cart'})
    }
    render() {
        const { course } = this.props;
        debugger
        const IconLink = ({ src, text }) => (
            <a
                style={{
                    marginRight: 16,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    style={{
                        marginRight: 8,
                    }}
                    src={src}
                    alt="start"
                />
                {text}
            </a>
        );
        const Content = ({ children, extraContent }) => {
            return (
                <Row className="content" type="flex">
                    <div className="main" style={{ flex: 1 }}>
                        {children}
                    </div>
                    <div
                        className="extra"
                        style={{
                            marginLeft: 80,
                        }}
                    >
                        {extraContent}
                    </div>
                </Row>
            );
        };
        const routes = [
            {
                path: 'index',
                breadcrumbName: 'Course',
            },
            {
                path: 'first',
                breadcrumbName: course.category[0],
            },
            {
                path: 'second',
                breadcrumbName: course.name,
            },
        ];
        const content = (
            <div className="content">
                <Row type="flex" style={{ alignItems: 'center'}}>
                    <Rate
                        count={5}
                        defaultValue={course.rate || 0}
                        allowHalf={true}
                        disabled
                    /> <p style={{ marginLeft: '15px'}}>({course.feedback_count} rangtings) {course.enroll_count} students</p>
                </Row>
                <Paragraph>
                    Ant Design interprets the color system into two levels: a system-level color system and a
                    product-level color system.
              </Paragraph>
                <Paragraph>
                    Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
                    easier for designers to have a clear psychological expectation of color when adjusting colors,
                    as well as facilitate communication in teams.
              </Paragraph>
                <Row className="contentLink" type="flex">
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                        text="Quick Start"
                    />
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                        text=" Product Info"
                    />
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                        text="Product Doc"
                    />
                </Row>
                <Row type="flex" style={{ marginTop: '20px', alignItems: 'center'}}>
                    <Button type="danger" ghost style={{ marginRight: '20px'}} onClick={() => this.handleAddToCart(course)}>
                        <Icon type="shopping-cart"/> Add to Cart
                    </Button>
                    <Button type="primary" ghost>
                        <Icon type="heart" /> Add to Wishlist
                    </Button>
                    <Button type="danger" style={{ marginLeft: '20px'}}>
                        <Icon type="share-alt" /> Share
                    </Button>
                </Row>
            </div>
        );
        return (
            <>
                <div style={{ color: 'white' }}>
                    <PageHeader
                        style={{
                            padding: '30px 64px',
                            color: 'white !important'
                        }}
                        title={course.name}
                        breadcrumb={{ routes }}
                        subTitle={course.teacher.name}
                    >
                        <Content
                            extraContent={
                                <img
                                    style={{ width: '200px', height: '200px' }}
                                    src={course.avatar_url}
                                    alt="content"
                                />
                            }
                        >
                            {content}
                        </Content>
                    </PageHeader>
                    <div style={{ height: '50vh', backgroundColor: 'white' }}>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    course: state.teacherCourse.data.currentCourse,
    cartItems: state.cart.carts
})

export default connect(mapStateToProps)(CourseDetail);