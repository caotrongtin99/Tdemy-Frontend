import { List, Col, Row, Button, Icon, Typography, PageHeader, notification, Skeleton, Avatar, Comment, Form, Input } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import Rate from 'rc-rate';
import Parser from 'html-react-parser';
import moment from 'moment';
import _ from 'lodash';
import ModalVideo from 'react-modal-video'
import { connect } from 'react-redux';
import { courseActions } from '../../actions/courseActions';
import { cartActions } from '../../actions/cartActions';
import { commentActions } from '../../actions/commentActions';
import './style.css';
import CommentList from '../../components/CommentList';
const { Paragraph } = Typography;
const { TextArea } = Input;
const count = 2;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Leave a feedback
        </Button>
      </Form.Item>
    </div>
  );
class CourseDetail extends Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        feedbacks: [],
        submitting: false,
        value: '',
        isOpen: false,
        videoUrl: ''
    };

    componentWillMount = async () => {
        const { match } = this.props;
        await this.props.dispatch(courseActions.getCourseDetail(match.params.id))
    }

    componentDidMount = () => {
        const { match } = this.props;
        const course = this.props.course;
        if (course.chapters) {
            const chapters = course.chapters;
             const list = chapters.slice(0, count)
            this.setState({
                data: chapters,
                list,
                feedbacks: this.props.course.feedback
            })
        } else {
            debugger
            this.props.dispatch(courseActions.getCourseDetail(match.params.id))
        }
    }

    handleAddToCart = (course) => {
        let isExist = false;
        this.props.cartItems.forEach(item => {
            if (item.id === course.id) {
                isExist = true;
                return;
            }
        })
        !isExist ? this.props.dispatch(cartActions.addToCart(course)) : notification.error({ message: 'Cart Notification', description: 'The course already exists in the shopping cart' })
    }
    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.list.concat([...new Array(count)].map(() => ({ loading: true, title: '' }))),
        });
        setTimeout(() => {
            const newList = this.state.list.splice(0, this.state.list.length - count);
            const extraElements = [...this.state.data].splice(newList.length, count);
            
            this.setState({
                loading: false,
                list: [...newList, ...extraElements]
            })
        }, 1000)
    }
    handleSubmit = async () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
        const feedback = {
            id: this.props.course.id,
            comment: this.state.value,
            rating: 4
        }
        
        await this.props.dispatch(commentActions.createFeedback(feedback));
        this.setState({
            submitting: false,
            value: ''
          });
    
      };
    
      handleChange = e => {
        if (!this.props.loggedIn) {
            notification.warning({
                message: 'Permission Notification!',
                description: 'Please login to feedback about the course'
            })        
        } else {
            this.setState({
            value: e.target.value,
            });
        }
      };

      handlePreview = (chapter) => {
          this.setState({
              isOpen: true,
              videoUrl: chapter.video_url
          })
      }
    render() {
        const { course } = this.props;
        const { isOpen, videoUrl, list, data, submitting, value } = this.state;
        const courseFeedbacks = course.feedback || [];
        const feedbacks = courseFeedbacks.map(feedback => Object.assign(feedback, {author: _.get(feedback,'User.name') || '', content: feedback.comment, avatar: _.get(feedback, 'User.avatar_url') || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',datetime: moment().fromNow()}));

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
                breadcrumbName: _.get(course, 'category[0]') || "",
            },
            {
                path: 'second',
                breadcrumbName: _.get(course, 'name'),
            },
        ];
        const content = (
            <div className="content">
                <Row type="flex" style={{ alignItems: 'center' }}>
                    <Rate
                        count={5}
                        defaultValue={course.rate || 0}
                        allowHalf={true}
                        disabled
                    /> <p style={{ marginLeft: '15px' }}>({_.get(course, 'feedback_count')} rangtings) {course.enroll_count} students</p>
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
                <Row type="flex" style={{ marginTop: '20px', alignItems: 'center' }}>
                    <Button type="danger" ghost style={{ marginRight: '20px' }} onClick={() => this.handleAddToCart(course)}>
                        <Icon type="shopping-cart" /> Add to Cart
                    </Button>
                    <Button type="primary" ghost>
                        <Icon type="heart" /> Add to Wishlist
                    </Button>
                    <Button type="danger" style={{ marginLeft: '20px' }}>
                        <Icon type="share-alt" /> Share
                    </Button>
                </Row>
            </div>
        );
        const loadMore =
            data.length > list.length ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button type="primary" ghost onClick={this.onLoadMore}>Loading more</Button>
                </div>
            ) : null;
        return (
            <>
                <div style={{ color: 'white' }}>
                    <ModalVideo channel='custom' autoplay isOpen={isOpen} url={videoUrl} allowFullScreen={true} onClose={() => this.setState({ isOpen: false})} />
                    <PageHeader
                        style={{
                            padding: '30px 64px',
                            color: 'white !important'
                        }}
                        title={course.name}
                        breadcrumb={{ routes }}
                        subTitle={_.get(course, 'teacher.name')}
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
                    <Row type="flex" justify="center" style={{ backgroundColor: 'white' }}>
                        <Col style={{ marginTop: '50px' }} md={20} sm={18}>
                            <div className='course-content'>
                                <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>Course Content</h2>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={course.chapters}
                                    loadMore={loadMore}
                                    renderItem={item => (
                                        <List.Item
                                            actions={[<a key="list-loadmore-edit" onClick={() => this.handlePreview(item)}>{item.status === 0 && 'Preview'}</a>]}>
                                            <Skeleton avatar title={false} loading={item.loading} active>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                />
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                            </div>
                            <div className='description' style={{ color: 'black', fontSize: '14px', margin: '30px 0' }}>
                                <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>Description</h2>
                                <div >
                                    {Parser(course.description || '<p></p>')}
                                </div>
                            </div>
                            <div className="feedbacks">

                            </div>
                            <div className="feedbacks">
                                <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>Feedbacks</h2>
                                <CommentList comments={feedbacks} />
                                <Comment
                                    avatar={
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            alt="Han Solo"
                                        />
                                    }
                                    content={
                                        <Editor
                                            onChange={this.handleChange}
                                            onSubmit={this.handleSubmit}
                                            submitting={submitting}
                                            value={value}
                                        />
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
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