import { notification } from 'antd';
import {config} from '../_constants/api';
require('dotenv').config()
const {API_URL} = config;

export const userService = {
  login,
  logout,
  sendVerificationEmail,
  sendforgotPasswordEmail,
  register,
  createComment,
  updateUser,
  updateUserPassword
};

function updateUserPassword(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
    },
    body: JSON.stringify(user),
  }
  return fetch(`${API_URL}/api/users/changepassword`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    })
}

function updateUser(user, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
    },
    body: JSON.stringify(user),
  }

  return fetch(`${API_URL}/api/users/${id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    })
}


function login(email, password, accessToken, refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, accessToken, refreshToken }),
  };

  return fetch(`${API_URL}/api/auth`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      if (res.result === 0){
        return res.data;
      }
    });
}


function sendVerificationEmail(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  return fetch("/api/user/sendVerificationEmail/", requestOptions).then(
    handleResponse
  );
}

function sendforgotPasswordEmail(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  return fetch("/api/user/sendforgotPasswordEmail/", requestOptions).then(
    handleResponse
  );
}

function logout() {
  localStorage.removeItem("token");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return fetch(`${API_URL}/api/users/`, requestOptions).then(handleResponse);
}

function createComment(feedback) {
  const id = feedback.id;
  delete feedback.id;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
    },
    body: JSON.stringify(feedback),
  };

  return fetch(`${API_URL}/api/courses/${id}/feedback`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
