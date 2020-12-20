import { userConstants } from "../_constants/userConstants";
import { userService } from "../_services/userService";
import { history } from "../_helpers/history";
import { message, notification } from "antd";
import { courseActions } from "./courseActions";

export const commentActions = {
    createFeedback
};

function createFeedback(feedback) {
    
    return (dispatch) => {
        userService.createComment(feedback)
            .then(data => {
                notification.success({ 
                    message: 'Feedback Notification!',
                    description: 'Feedback successfully!'
                })
                dispatch({ type: 'createFeedback', data})
                // dispatch(courseActions.getCourseDetail(feedback.course_id))
            })
    };

    function success(data) {
        return { type: userConstants.GET_NEW_USERS_SUCCESS, data };
    }
}
