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
        case "createFeedback":
        
            return {
                ...state,
                data: { ...state.data, currentCourse: { ...state.data.currentCourse, feedback: [...state.data.currentCourse.feedback,action.data]} }
            };

        case "getCourseDetail":
            console.log("===================gio moi vao ne================")
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
            
            return {
                ...state,
                data: { ...state.data, ...newData }
            }
        case "saveChapter":
            return {
                ...state,
                data: { ...state.data, currentCourse: {...state.data.currentCourse, chapters: [...state.data.currentCourse.chapters,action.data]} }
            }
        case "deleteChapter":
            const {courseId, chapterId} = action.data;
            const newChapter = state.data.currentCourse.chapters.filter(chapter => chapter.id !== chapterId)
            return {
                ...state,
                data: { ...state.data, currentCourse: {...state.data.currentCourse, chapters: newChapter} }
            }
        default:
            return state;
    }
}
