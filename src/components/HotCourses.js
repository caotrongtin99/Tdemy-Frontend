import React, { Component } from 'react'
import {connect} from 'react-redux'
import './HotCourses.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CourseCard from './CourseCard';


class MostViewCourses extends Component {
    handleOnlick = () => {
        
    }
    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };

        const {courses} = this.props;
        return (
            <>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    itemClass="carousel-item-padding-40-px"
                >
                    {
                        courses.map(course => <CourseCard isBestSeller={true} onClick={this.handleOnlick} course={course}/>)
                    }
                </Carousel>
            </>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.studentCourse.data.mostViewCourses
})

export default connect(mapStateToProps)(MostViewCourses);