import {config} from '../_constants/api';
import axios from 'axios'
const {API_URL} = config;
export const courseService = {
    createCourse,
    updateCourse,
    getCourseDetail,
    getTeacherCourses
};


function createCourse(course) {
    debugger
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  };

  return fetch(`${API_URL}/api/courses`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}

function updateCourse(course) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  };

  return fetch(`${API_URL}/api/courses/${course.id}`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}

function getCourseDetail(id) {
  return fetch(`${API_URL}/api/courses/${id}`)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}


async function getTeacherCourses(id) {
    const res = await axios.post(`${API_URL}/api/courses`, {
        params: {
          accessToken: localStorage.getItem('ref_token'),
          type: 'teacher',
          type_id: id
        }
      })
    return res.data;
}



function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
