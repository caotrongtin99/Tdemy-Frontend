import { userConstants } from "../_constants/userConstants";
import { userService } from "../_services/userService";
import _ from 'lodash';
import { message, notification } from "antd";
import { courseActions } from "./courseActions";

export const commentActions = {
    createFeedback
};

function createFeedback(feedback) {
    
    return (dispatch) => {
        userService.createComment(feedback)
            .then(data => {
                if (_.isEmpty(data)){
                    notification.error({ 
                        message: 'Feedback Notification!',
                        description: 'You need to enroll this course to feedbacky!'
                    })
                } else {
                    notification.success({ 
                        message: 'Feedback Notification!',
                        description: 'Feedback successfully!'
                    })
                    dispatch({ type: 'createFeedback', data})
                }
                // dispatch(courseActions.getCourseDetail(feedback.course_id))
            })
    };

    function success(data) {
        return { type: userConstants.GET_NEW_USERS_SUCCESS, data };
    }
}
