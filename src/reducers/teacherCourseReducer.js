import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { commentConstants } from "../_constants/commentConstants";

const initialState = {
    data: {
        currentCourse: {

        },
        courses: [

        ]
    }
};

export function teacherCourse(state = initialState, action) {
    switch (action.type) {
        case "createCourse":
            return {
                ...state,
                data: { ...state.data, currentCourse: action.data }
            };

        case "getCourseDetail":
            console.log("==========a VO DUOC REDUCER ======", action.data)
            console.log("======new state ========", {
                ...state.data, currentCourse: action.data
            })
            return {
                ...state,
                data: {
                    ...state.data, currentCourse: action.data
                },
            };
        case "getTeacherCourse":
            console.log("==========get techer courses VO DUOC REDUCER ======", action.data)
            console.log("======new state ========", {
                ...state.data, courses: action.data
            })
            return {
                ...state,
                data: {
                    ...state.data, courses: action.data
                },
            };
        case "saveUserData":
            const { user } = action;
            const newData = { ...state.data, name: user.name, email: user.email, role: user.role, avater: user.avatar };
            debugger
            return {
                ...state,
                data: { ...state.data, ...newData }
            }
        default:
            return state;
    }
}
