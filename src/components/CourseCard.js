import { Card, Popover, Row, Button, Tag } from 'antd'
import React, { Component } from 'react'
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Heart from "react-animated-heart";
import _ from 'lodash';

export default class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInWishList : this.props.course.isInWishList
        }
    }
    render() {
        const { course } = this.props;
        const content = (
            <div>
                <h2 style={{ fontWeight: 'bold' }}>{course.name}</h2>
                <Tag color="magenta">{course.category}</Tag>
                <Row type="flex" style={{ alignItems: "center"}}>
                    <Button type="danger" danger>
                        Add to card
                    </Button>
                    <Heart isClick={this.state.isInWishList} onClick={() => this.setState({ isInWishList : !this.state.isInWishList})} />
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