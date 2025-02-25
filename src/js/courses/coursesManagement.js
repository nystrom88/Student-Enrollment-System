import Course from "./courseClass";

class CourseManagement {
  static coursesList = [];

  static addCourse(courseName, students, instructor) {
    // Get courses from local storage
    // this.coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    this.coursesList.push(new Course(courseName));
  }

  static updateCourse() {}

  static removeCourse() {}

  static storeCourse() {
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
  }
}

export default CourseManagement;
