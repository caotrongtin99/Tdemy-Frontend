import React, { Component } from 'react'
import axios from 'axios'
import './HotCourses.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CourseCard from './CourseCard';


export default class HotCourses extends Component {

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

        const courses = 
        [
            {
            id: 1,
            name: 'Lap trinh web',
            avatar: 'https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            author: 'CTT',
            rating: 4.5,
            fee: 10,
            discount: 3,
            category: 'Web',
            isInWishList: false,
            },
            {
                id: 2,
                name: 'Lap trinh di dong',
                avatar: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
                author: 'Duc Thong',
                rating: 3,
                fee: 10,
                discount: 3,
                category: 'Mobile',
                isInWishList: false,
            },
            {
                id: 3,
                name: 'Lap trinh windows',
                avatar: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg',
                author: 'Ngo Truc',
                rating: 4,
                fee: 10,
                discount: 3,
                category: 'Windows',
                isInWishList: false,
            },
            {
                id: 4,
                name: 'Lap trinh game',
                avatar: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
                author: 'Tin Cao',
                rating: 4,
                fee: 10,
                discount: 3,
                category: 'Game',
                isInWishList: false,
                }
        ]
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
                        courses.map(course => <CourseCard course={course}/>)
                    }
                </Carousel>
            </>
        );
    }
}