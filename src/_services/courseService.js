import {config} from '../_constants/api';
import axios from 'axios'
import { notification } from 'antd';
const {API_URL} = config;
export const courseService = {
    createCourse,
    updateCourse,
    getCourseDetail,
    getTeacherCourses,
    createChapter,
    updateChapter,
    getStudentCourses,
    getMostViewCourses,
    deleteCourse,
    createEnroll,
    addToWishList,
    getStudentWishList
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

function deleteCourse(course) {
  const id = course.id;
  delete course.id;
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token')
     }
  };

  return fetch(`${API_URL}/api/courses/${id}`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.result;
    });
}

function getCourseDetail(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token')
    },
    };
  return fetch(`${API_URL}/api/courses/${id}`,requestOptions)
    .then(handleResponse)
    .then((res) => {
      console.log("=========res from service =============", res);
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
  
  return res.data.data.array;
}

async function createChapter(chapter) {
    const res = await axios.post(`${API_URL}/api/courses/${chapter.courseId}/chapters`, {
        title: chapter.title,
        video_url: chapter.video_url,
        status: 0,
        duration: 123
    }, {
        headers: {
      "x-access-token": localStorage.getItem('token'),
      "x-refresh-token": localStorage.getItem('ref_token')
  }})
  if (res.data.result === -1) {
    notification.error({ message: 'Error!'})
    return res.data.result;
  }
  return res.data.data;
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

function createEnroll(courseIds) {
  const data = {course_id: courseIds}
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token') },
    body: JSON.stringify(data),
  };

  return fetch(`${API_URL}/api/enroll`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      if (res.result === 0){
        return res.data;
      } else {
        notification.error({message: 'Error!!!'})
      }
    });
}

function addToWishList(courseId) {
  const data = {course_id: courseId}
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token') },
    body: JSON.stringify(data),
  };

  return fetch(`${API_URL}/api/wishlist`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      debugger
      if (res.result === 0){
        return res.data;
      } else {
        notification.error({message: 'Error!!!'})
      }
    });
}

function getStudentWishList(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    "x-access-token": localStorage.getItem('token'),
    "x-refresh-token": localStorage.getItem('ref_token')
    },
    };
  return fetch(`${API_URL}/api/wishlist/`,requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res.data;
    });
}
function handleResponse(response) {
  debugger
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
