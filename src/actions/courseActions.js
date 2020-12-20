import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { courseService } from "../_services/courseService";
import { alertActions } from "./alertActions";
import { history } from "../_helpers/history";
import { notification } from "antd";

export const courseActions = {
    createCourse,
    updateCourse,
    getCourseDetail,
    getTeacherCourses,
    createChapter,
    updateChapter,
    getStudentCourses,
    getMostViewCourses,
    deleteCourse,
    createEnroll
};

function createCourse(course) {
    
    return (dispatch) => {
        // dispatch({ type: 'creatCourse', course });
        courseService.createCourse(course)
            .then(data => {
                
                dispatch({type: 'createCourse', data});
                history.push(`/teacher/course/manage/${data.id}`)
            })
    };

    function success(data) {
        return { type: userConstants.GET_NEW_USERS_SUCCESS, data };
    }
}

function updateCourse(course) {
    const {id} = course;
    return (dispatch) => {
        // dispatch({ type: 'creatCourse', course });
        courseService.updateCourse(course)
            .then(data => {
                if (data[0] ==1){
                    // dispatch(alertActions.success("Update course fee successfully!!"))
                    notification.success({
                        message: 'Update message',
                        description: 'Update Course successfully!'
                    })
                    dispatch(courseActions.getCourseDetail(id));
                }
            })
    };
}

function deleteCourse(course) {
    const {id} = course;
    return (dispatch) => {
        courseService.deleteCourse(course)
            .then(data => {
                if (data === 0){
                    notification.success({
                        message: 'Delete message',
                        description: 'Delete Course successfully!'
                    })
                    history.push('/teacher/course/')
                }
            })
    };
}

function getCourseDetail(id) {
    return (dispatch) => {
        courseService.getCourseDetail(id)
        .then(data => {
            dispatch({ type: 'getCourseDetail', data});
        })
    };
}

function getTeacherCourses(id) {
    return (dispatch) => {
        courseService.getTeacherCourses(id)
        .then(data => {
            dispatch({ type: 'getTeacherCourse', data: data.data.array})
        })
    };
}

function getStudentCourses(id) {
    return (dispatch) => {
        courseService.getStudentCourses(id)
        .then(data => {
            dispatch({ type: 'getStudentCourses', data: data.data.array})
        })
    };
}

function getMostViewCourses() {
    return (dispatch) => {
        courseService.getMostViewCourses()
        .then(data => {
            dispatch({ type: 'getMostViewCourses', data: data})
        })
    };
}

function createChapter(chapter) {
    return (dispatch) => {
        courseService.createChapter(chapter)
            .then(data => {
                if (data !== -1){
                    dispatch({ type: 'saveChapter', data})
                    notification.success({
                        message: 'Chapter Notification',
                        description: 'Create chapter successfully!'
                    })
                }
            })
    }
}

function createEnroll(courseIds) {
    return (dispatch) => {
        courseService.createEnroll(courseIds)
            .then(data => {
                    dispatch({ type: 'addMyCourses', data: data.array})
                    })
    }
}

function updateChapter(courseId, chapter) {
    return (dispatch) => {
        courseService.updateChapter(chapter)
            .then(data => {
                if (data[0] ==1){
                    dispatch(courseActions.getCourseDetail(courseId));
                    notification.success({
                        message: 'Update message',
                        description: 'Update Chapter successfully!'
                    })
                }
            })
    }
}