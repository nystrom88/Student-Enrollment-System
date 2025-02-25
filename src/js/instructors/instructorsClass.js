import Person from "../core/personClass";

class Instructor extends Person {
  constructor(name, age, email, courses) {
    super(name, age, email);
    this.courses = courses;
  }
}

export default Instructor;
