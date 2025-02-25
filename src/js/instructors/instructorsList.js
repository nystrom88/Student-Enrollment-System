import coursesList from "../courses/coursesList";
import Instructor from "./instructorsClass";

const instructorsList = [
  new Instructor("Bob Backster", 32, "bob@gmail.com", [coursesList[1]]),
  new Instructor("Sophie Stone", 55, "sophie@gmail.com", [coursesList[0], coursesList[2]]),
  new Instructor("Tim Murphy", 22, "tim@gmail.com"),
];

export default instructorsList;
