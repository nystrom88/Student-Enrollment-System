import UICourses from "./coursesRender";

class CourseManagement {
  static coursesList = [];

  static getCourses() {
    return JSON.parse(localStorage.getItem("coursesList")) || [];
  }

  static addCourse(courseInstance) {
    this.coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    this.coursesList.push(courseInstance);
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
    UICourses.renderCourses(this.coursesList);
  }

  static editCourse(courseId) {
    const courseArray = JSON.parse(localStorage.getItem("coursesList")) || [];
    const course = courseArray.find((course) => course.courseId === courseId);
    // form = document.querySelctor(".form");
    // submitButton = document.querySelctor("");
    // submitButton.textContent = "Confirm Edit";

    // POPULATE FORM
    // Select Inputs
    // courseName = document.querySelector("...");
    // students = document.querySelector("...");
    // instructor = document.querySelector("...");
    // maxStudents = document.querySelector("...");

    // Fill input with current details
    // courseName.textContent = course.name;
    // students = document.querySelector("...");
    // instructor = document.querySelector("...");
    // maxStudents = document.querySelector("...");

    // On submit
    // course = {
    //   this.courseName = courseName;
    //   this.students = students;
    //   this.instructor = instructor;
    //   this.maxStudents = maxStudents;
    // }

    // this.coursesList = courseArray;
    // localStorage.setItem("coursesList", JSON.stringify(this.coursesList));

    // Revert form
    // form.reset();
    // submitButton.textContent = "Add course";
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
