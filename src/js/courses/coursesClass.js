import { v4 as uuidv4 } from "uuid";

class Courses {
  constructor(studentsName, instructorsName, courseName) {
    this.studentName = studentsName;
    this.instructorsName = instructorsName;
    this.courseName = courseName;
    this.courseId = uuidv4();
  }
}

export default Courses;
