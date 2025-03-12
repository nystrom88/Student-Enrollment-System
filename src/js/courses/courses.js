import coursesList from "./coursesList";
import CourseManagement from "./coursesManagement";

import UICourses from "./coursesRender";
const addCourseButton = document.querySelector(".add-course__button");

addCourseButton.addEventListener("click", () => {
  console.log("Button clicked");
});

document.addEventListener("DOMContentLoaded", () => {
  UICourses.renderCourses(coursesList);
});
