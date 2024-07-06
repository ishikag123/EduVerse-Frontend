import React from "react";
import axios from "axios";

const port = import.meta.env.VITE_SERVER;
const video_url = import.meta.env.VITE_CLOUDINARY_URL;
const cloudName = import.meta.env.VITE_CLOUDNAME;

const generateSignature = (publicId, timestamp, apiSecret) => {
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
};

export const studentRegister = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${port}/student/register`, data, config);
    //console.log(res.data);
    localStorage.setItem("studentToken", JSON.stringify(res.data));
    //localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    console.log(err.response.data);
  }
};

export const studentLogin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${port}/student/login`, data, config);
    //console.log(res.data);
    localStorage.setItem("studentToken", JSON.stringify(res.data));
    // localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Wrong credentials!!!");
    } else {
      console.log(error.response.data);
    }
  }
};

export const getAllStudents = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-all`, config);
    console.log(res.data);
  } catch (error) {
    console.log(err.response.data);
  }
};
export const getStudent = async (mail, token) => {
  //const token = data.stoken;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-student/${mail}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getTeachers = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-all-teachers`, config);
    const teachers = res.data;
    //console.log(res.data);
    return teachers;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getCourses = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-all-courses`, config);
    // console.log("data from external:", res.data);
    const courses = res.data;
    return courses;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getCourseByID = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-course/${id}`, config);
    // console.log("data from external:", res.data);
    const course = res.data;
    return course;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getTeacherByID = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-teacher/${id}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getCourseByTeacher = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-courses-of/${id}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getEnrolledCourses = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `${port}/student/enrolled-courses/${id}`,
      config
    );
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const enrollStudent = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/enroll`, data, config);
    if (res.status === 200) {
      alert("You are successfully enrolled!!!");
    } else if (res.status === 400) {
      alert("Already enrolled!!!");
    }
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Already enrolled!!!");
    } else {
      console.log(error.response.data);
    }
  }
};

export const unEnrollStudent = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/unenroll`, data, config);
    if (res.status === 200) {
      alert("You left the course");
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const courseComment = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/comment`, data, config);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Already enrolled!!!");
    } else {
      console.log(error.response.data);
    }
  }
};

export const wishlistCourse = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/wishlist`, data, config);
    if (res.status === 200) {
      alert("You wishlisted this course!!");
    } else if (res.status === 400) {
      alert("Already exists in wishlist!!");
    }
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Already exists in wishlist!!");
    } else {
      console.log(error.response.data);
    }
  }
};

export const rateCourse = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/rate-course`, data, config);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const rateTeacher = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/rate-teacher`, data, config);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const removeCourseFromWishlist = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${port}/student/remove-from-wishlist`,
      data,
      config
    );
    if (res.status === 200) {
      alert("Course was removed from wishlist!!");
    }
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const editStudent = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/student/edit`, data, config);
    if (res.status === 200) {
      alert("Profile updated!!");
    }
    return res.data;
    //localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    console.log(err.response.data);
  }
};

//////////////////////////TEACHER/////////////////////////////////

export const teacherRegister = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${port}/teacher/register`, data, config);
    //console.log(res.data);
    localStorage.setItem("teacherToken", JSON.stringify(res.data));
    //localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    console.log(err.response.data);
  }
};

export const teachLogin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    //console.log(port);
    const res = await axios.post(`${port}/teacher/login`, data, config);
    //console.log(res.data);
    localStorage.setItem("teacherToken", JSON.stringify(res.data));
    // localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Wrong credentials!!!");
    } else {
      console.log(error.response.data);
    }
  }
};

export const getTeacher = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/teacher/get-teacher/${id}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getMyCourses = async (token, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/teacher/get-my-courses/${id}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const createCourse = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(`${port}/teacher/create-course`, data, config);
    if (res) alert("Course Created!!!");
    console.log(res.data);
  } catch (error) {
    console.log(err.response.data);
  }
};

export const editTeacher = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/teacher/edit`, data, config);
    if (res.status === 200) {
      alert("Profile updated!!");
    }
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const editCourse = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(`${port}/teacher/edit-course`, data, config);
    if (res.status === 200) {
      alert("Course updated!!");
    }
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getEnrolledStudent = async (mail, token) => {
  //const token = data.stoken;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${port}/teacher/get-student/${mail}`, config);
    return res.data;
  } catch (error) {
    console.log(err.response.data);
  }
};

export const uploadVideo = async (data) => {
  // const data = {};
  // data.append("file", video);
  // data.append("upload_preset", "EduVerse_Preset");
  try {
    let resourceType = "video";
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
    const res = await axios.post(api, data);
    const { public_id } = res.data;
    console.log(public_id);
    return public_id;
  } catch (error) {
    console.log(error);
  }
};

export const uploadDP = async (data) => {
  // const data = {};
  // data.append("file", video);
  // data.append("upload_preset", "EduVerse_Preset");
  try {
    //let resourceType = "image";
    console.log(data);
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const res = await axios.post(api, data);

    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
