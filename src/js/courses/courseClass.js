import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(courseName, students = [], instructor = "") {
    this.courseName = courseName;
    this.students = students;
    this.instructor = instructor;
    this.courseId = uuidv4();
  }
}

export default Course;
