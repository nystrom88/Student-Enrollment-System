import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(courseName, maxStudents) {
    this.courseName = courseName;
    this.students = [];
    this.instructor = "";
    this.maxStudents = maxStudents;
    this.courseId = uuidv4();
  }
}

export default Course;
