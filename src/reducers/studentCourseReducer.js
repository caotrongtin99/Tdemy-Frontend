import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { commentConstants } from "../_constants/commentConstants";

const initialState = {
    data: {
        currentCourse: {
            chapters: []
        },
        myCourses: [

        ],
        wishlists: [

        ],
        mostViewCourses: [

        ]
    }
};

export function studentCourse(state = initialState, action) {
    switch (action.type) {
        case "getStudentCourses":
            return {
                ...state,
                data: {
                    ...state.data, courses: action.data
                },
            };
        case "getMostViewCourses":
            return {
                ...state,
                data: {
                    ...state.data, mostViewCourses: action.data
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
            return {
                ...state,
                data: { ...state.data, currentCourse: { ...state.data.commentConstantscurrentCourse, chapters: [...state.data.currentCourse.chapters, action.data] } }
            }
        default:
            return state;
    }
}
