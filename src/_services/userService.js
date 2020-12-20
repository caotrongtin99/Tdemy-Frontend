import {config} from '../_constants/api';
const {API_URL} = config;
export const userService = {
  login,
  logout,
  sendVerificationEmail,
  sendforgotPasswordEmail,
  register,
  createComment
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
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("ref_token", res.data.ref_token);
      return res.data;
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
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token') },
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
