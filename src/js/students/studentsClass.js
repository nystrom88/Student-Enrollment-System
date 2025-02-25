import Person from "../core/personClass";

class Student extends Person {
  constructor(name, age, email, enrollmentYear, courses) {
    super(name, age, email);
    this.enrollmentYear = enrollmentYear;
    this.courses = courses;
  }
}

export default Student;
