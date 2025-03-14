import CourseValidation from "../formValidation/courseValidation";
import Course from "./courseClass";

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
    this.coursesList = this.getCourses();
    this.coursesList.push(courseInstance);
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
  }

  static editCourse(id, courseNameInput, courseMaxStudentsInput) {
    const courseNameInputValue = courseNameInput.value.trim();
    const courseMaxStudentsInputValue = courseMaxStudentsInput.value.trim();

    if (!CourseValidation.validateCourse()) {
      return;
    }

    const courseUpdatedArray = this.getCourses();
    const course = courseUpdatedArray.find((course) => course.courseId === id);
    course.courseName = courseNameInputValue;
    course.maxStudents = courseMaxStudentsInputValue;

    this.coursesList = courseUpdatedArray;
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
  }

  static removeCourse(id) {
    const courseArray = this.getCourses();
    const filteredCourses = courseArray.filter((course) => course.courseId !== id);
    this.coursesList = filteredCourses;
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
  }
}

export default CourseManagement;
