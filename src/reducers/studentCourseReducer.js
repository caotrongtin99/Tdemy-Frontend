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

        ],
        searchKeyword: '',
        category: ''
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
            
            return {
                ...state,
                data: { ...state.data, ...newData }
            }
        case "getStudentWishlist":
            return {
                ...state,
                data: {
                    ...state.data, wishlists: action.data
                },
            };
        case "addMyCourses":
            return {
                ...state,
                data: { ...state.data, myCourses: [...state.data.myCourses,...action.data] }
            }
        case "removeItemInWishlist":
            const courseId = action.data[0];
            return {
                ...state,
                data: { ...state.data, wishlists: state.data.wishlists.filter(item => item.course_id !== courseId) }
            }
        case "saveSearchKeyword":
            return {
                ...state,
                data: { ...state.data, searchKeyword: action.data}
            }
        case "saveCategoryParams":
            return {
                ...state,
                data: { ...state.data, category: action.data}
            }
        default:
            return state;
    }
}
