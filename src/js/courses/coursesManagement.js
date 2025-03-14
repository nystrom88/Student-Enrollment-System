import CourseValidation from "../formValidation/courseValidation";
import Course from "./courseClass";
import UICourses from "./coursesRender";

class CourseManagement {
  static coursesList = [];

  static getCourses() {
    return JSON.parse(localStorage.getItem("coursesList")) || [];
  }

  static addCourse(courseNameInput, courseMaxStudentsInput) {
    const courseNameInputValue = courseNameInput.value.trim();
    const courseMaxStudentsInputValue = courseMaxStudentsInput.value.trim();

    if (!CourseValidation.validateCourse()) {
      return;
    }

    const courseInstance = new Course(courseNameInputValue, courseMaxStudentsInputValue);
    this.coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    this.coursesList.push(courseInstance);
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
    UICourses.renderCourses(this.coursesList);
  }

  static editCourse(courseId) {
    const courseArray = JSON.parse(localStorage.getItem("coursesList")) || [];
    const course = courseArray.find((course) => course.courseId === courseId);
  }

  static removeCourse(courseId) {
    const courseArray = JSON.parse(localStorage.getItem("coursesList")) || [];
    const filteredCourses = courseArray.filter((course) => course.courseId !== courseId);

    this.coursesList = filteredCourses;
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
    UICourses.renderCourses(this.coursesList);
  }
}

export default CourseManagement;
