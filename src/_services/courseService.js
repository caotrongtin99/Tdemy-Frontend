import {config} from '../_constants/api';
import axios from 'axios'
const {API_URL} = config;
export const courseService = {
    createCourse,
    updateCourse,
    getCourseDetail,
    getTeacherCourses,
    createChapter,
    updateChapter,
    getStudentCourses,
    getMostViewCourses
};


function createCourse(course) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token') },
    body: JSON.stringify(course),
  };

  return fetch(`${API_URL}/api/courses/new`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}

function updateCourse(course) {
  const id = course.id;
  delete course.id;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token')
     },
    body: JSON.stringify(course),
  };

  return fetch(`${API_URL}/api/courses/${id}`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}

function getCourseDetail(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
        //"x-access-token": localStorage.getItem('token'),
        //"x-refresh-token": localStorage.getItem('ref_token')
    },
    };
  return fetch(`${API_URL}/api/courses/${id}`,requestOptions)
    .then(handleResponse)
    .then((res) => {
      debugger
      return res.data;
    });
}


async function getTeacherCourses(id) {
    const res = await axios.post(`${API_URL}/api/courses`, {
          type: 'teacher',
          value: id
      }, {
          headers: {
        "x-access-token": localStorage.getItem('token'),
        "x-refresh-token": localStorage.getItem('ref_token')
    }})
    return res.data;
}

async function getStudentCourses(id) {
  const res = await axios.post(`${API_URL}/api/courses`, {
        type: 'student',
        value: id
    }, {
        headers: {
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
  }})
  return res.data;
}

async function getMostViewCourses() {
  const res = await axios.post(`${API_URL}/api/courses`, {
        type: 'view'
      }, {
        headers: {
        "x-access-token": localStorage.getItem('token'),
        "x-refresh-token": localStorage.getItem('ref_token')
  }})
  debugger
  return res.data.data.array;
}


async function createChapter(chapter) {
    const res = await axios.post(`${API_URL}/api/courses/${chapter.courseId}/chapters`, {
        title: chapter.title,
        status: 0,
        duration: 123
    }, {
        headers: {
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
  }})
  return res.data.data.dataValues;
}

function updateChapter(chapter) {
  const id = chapter.id;
  const courseId = chapter.courseId;
  delete chapter.id;
  delete chapter.courseId;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token')
     },
    body: JSON.stringify(chapter),
  };

  return fetch(`${API_URL}/api/courses/${courseId}/chapters/${id}`, requestOptions)
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
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
