import {config} from '../_constants/api';
const {API_URL} = config;
export const userService = {
  login,
  logout,
  sendVerificationEmail,
  sendforgotPasswordEmail,
  register,
  getNewUsers,
};


function login(email, password, accessToken, refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, accessToken, refreshToken }),
  };

  return fetch(`${API_URL}/api/auth`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", res);
      return res.user;
    });
}

function getNewUsers(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params }),
  };

  return fetch("/api/user/getNewUsers", requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res;
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
  debugger
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

function handleResponse(response) {
  debugger
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
