import Course from "./courseClass";

class CourseManagement {
  static coursesList = [];

  static addCourse(courseName, students, instructor, maxStudents) {
    this.coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    this.coursesList.push(new Course(courseName, students, instructor, maxStudents));
    localStorage.setItem("coursesList", JSON.stringify(this.coursesList));
    // Re-render interface
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
    // Re-render interface
  }
}

export default CourseManagement;
