import { userConstants } from "../_constants/userConstants";
import { postConstants } from "../_constants/postConstants";
import { commentConstants } from "../_constants/commentConstants";

const initialState = {
  loadingUser: true,
  data: {
    id: "",
    name: "person.png",
    email: "",
    role: "",
    avatar: "",
    email: "",
    follwingUsers: [],
    followerUsers: [],
    posts: [],
  },
};

export function userProfile(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USERPROFILE_DATA_REQUEST:
      return {
        ...state,
        ...initialState,
      };

    case userConstants.GET_USERPROFILE_DATA:
      return {
        ...state,
        loadingUser: false,
        data: {
          ...state.data,
          ...action.user.user,
        },
      };
    case userConstants.GET_USERPROFILE_DATA_FAILURE:
      return {
        ...state,
        loadingUser: false,
      };
    case userConstants.GET_USER_PROFILE_FOLLOWINGS:
      return {
        ...state,
        data: {
          ...state.data,
          follwingUsers: action.users,
        },
      };
    case "saveUserData": 
      const {user} = action;
      const newData = {...state.data, name: user.name, email: user.email, role: user.role, avater: user.avatar, id: user.id};
      
      return {
        ...state,
        data: {...state.data, ...newData}
      }
    default:
      return state;
  }
}
