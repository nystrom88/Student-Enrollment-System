import Person from "./person";
class Instructor extends Person {
  constructor(name, age, email, instructorId) {
    super(name, age, email);
    this.instructorId = instructorId;
  }
}

export default Instructor;
