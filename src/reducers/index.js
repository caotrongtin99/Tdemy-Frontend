import { combineReducers } from "redux";

import { authentication } from "./authenticationReducer";
import { registration } from "./registrationReducer";
import { user } from "./userReducer";
import { alert } from "./alertReducer";
import { post } from "./postReducer";
import { teacherCourse } from "./teacherCourseReducer";
import { userProfile } from "./userProfileReducer";
import { socket } from "./socketReducer";
import { postUpload } from "./postUploadPageReducer";
import { cart } from "./cartReducer";
import { newUsers } from "./newUsersReducer";
import { passwordReset } from "./passwordResetReducer";
import { userConstants } from "../_constants/userConstants";

const appReducer = combineReducers({
  post,
  authentication,
  registration,
  user,
  newUsers,
  passwordReset,
  alert,
  userProfile,
  socket,
  postUpload,
  cart,
  teacherCourse
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
