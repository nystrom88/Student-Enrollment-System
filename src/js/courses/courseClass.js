import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(courseName, students = [], instructor = "", maxStudents = 30) {
    this.courseName = courseName;
    this.students = students;
    this.instructor = instructor;
    this.maxStudents = maxStudents;
    this.courseId = uuidv4();
  }
}

export default Course;
