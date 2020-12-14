import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { courseService } from "../_services/courseService";
import { alertActions } from "./alertActions";
import { history } from "../_helpers/history";

export const courseActions = {
    createCourse,
    updateCourse,
    getCourseDetail,
    getTeacherCourses
};

function createCourse(course) {
    return (dispatch) => {
        // dispatch({ type: 'creatCourse', course });
        courseService.createCourse(course)
            .then(data => {
                debugger
                dispatch({type: 'createCourse', data});
                history.push(`/teacher/course/manage/${data.id}`)
            })
    };

    function success(data) {
        return { type: userConstants.GET_NEW_USERS_SUCCESS, data };
    }
}

function updateCourse(course) {
    return (dispatch) => {
        // dispatch({ type: 'creatCourse', course });
        courseService.updateCourse(course)
            .then(data => {
                debugger
                if (data[0] ==1){
                    dispatch(alertActions.success("Update course fee successfully!!"))
                    getCourseDetail(course.id);
                }
            })
    };
}



function getCourseDetail(id) {
    return (dispatch) => {
        courseService.getCourseDetail(id)
        .then(data => {
            console.log("========data action =========", data);
            dispatch({ type: 'getCourseDetail', data})
        })
        // dispatch({ type: 'getCourseDetail', courseId});

        // userService.updateUser(user).then(
        //   (data) => {
        //     dispatch(success(data.user));
        //   },
        //   (error) => {
        //     dispatch(failure(error.toString()));
        //     //dispatch(alertActions.error(error.toString()));
        //   }
        // );
    };

    function request() {
        return { type: userConstants.USER_UPDATE_REQUEST };
    }
    function success(user) {
        return { type: userConstants.USER_UPDATE_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.USER_UPDATE_FAILURE, error };
    }
}

function getTeacherCourses(id) {
    return (dispatch) => {
        courseService.getTeacherCourses(id)
        .then(data => {
            debugger
            dispatch({ type: 'getTeacherCourse', data: data.data})
        })
    };

    function request() {
        return { type: userConstants.USER_UPDATE_REQUEST };
    }
    function success(user) {
        return { type: userConstants.USER_UPDATE_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.USER_UPDATE_FAILURE, error };
    }
}