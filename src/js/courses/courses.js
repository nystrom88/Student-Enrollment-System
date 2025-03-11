import coursesList from "./coursesList";
import CourseManagement from "./coursesManagement";

import UICourses from "./coursesRender";
document.addEventListener("DOMContentLoaded", () => {
  UICourses.renderCourses(coursesList);
});
