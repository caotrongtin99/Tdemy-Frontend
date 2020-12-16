import { Card, Popover, Row, Button, Icon, Typography, PageHeader } from 'antd'
import React, { Component } from 'react'
import 'rc-rate/assets/index.css';
import Heart from "react-animated-heart";
import _ from 'lodash';
import { connect } from 'react-redux';
const { Paragraph } = Typography;

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                id: 1,
                name: 'Lap trinh web',
                avatar: 'https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                author: 'CTT',
                rating: 4.5,
                fee: 10,
                discount: 3,
                category: 'Web',
                isInWishList: false,
            }
        }
    }

    render() {
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
                breadcrumbName: this.state.course.category,
            },
            {
                path: 'second',
                breadcrumbName: this.state.course.name,
            },
        ];
        const content = (
            <div className="content">
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
            </div>
          );
        return (
            <>
                <div style={{ color: 'white' }}>
                    <PageHeader
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgb(0, 71, 144), rgb(29, 104, 179))',
                            padding: '30px 64px',
                            color: 'white !important'
                            // border: '1px solid rgb(235, 237, 240)'
                        }}
                        title="Title"
                        breadcrumb={{ routes }}
                        subTitle="This is a subtitle"
                    >
                        <Content
                            extraContent={
                                <img
                                    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
                                    alt="content"
                                />
                            }
                        >
                            {content}
                        </Content>
                    </PageHeader>
                    <div style={{ height: '50vh'}}>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
})

export default connect(mapStateToProps)(CourseCard);