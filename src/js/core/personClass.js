import { v4 as uuidv4 } from "uuid";
class Person {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = uuidv4();
  }
}

export default Person;
