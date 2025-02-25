import Person from "../core/personClass";

class Student extends Person {
  constructor(name, age, email, studentId, enrollmentYear, courses) {
    super(name, age, email);
    this.studentId = studentId;
    this.enrollmentYear = enrollmentYear;
    this.courses = courses;
  }
}

export default Student;
