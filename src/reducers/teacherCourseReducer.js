import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { commentConstants } from "../_constants/commentConstants";

const initialState = {
    data: {
        currentCourse: {
            chapters: []
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
            return {
                ...state,
                data: {
                    ...state.data, currentCourse: action.data
                },
            };
        case "getTeacherCourse":
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
        case "saveChapter":
            console.log("========new chapter ===========", action.data)
            console.log("========add chapter======", { ...state.data, currentCourse: {...state.data.currentCourse, chapters: [...state.data.currentCourse.chapters,action.data]} })
            return {
                ...state,
                data: { ...state.data, currentCourse: {...state.data.commentConstantscurrentCourse, chapters: [...state.data.currentCourse.chapters,action.data]} }
            }
        default:
            return state;
    }
}
