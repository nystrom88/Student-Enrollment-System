import coursesList from "../courses/coursesList";
import Student from "./studentsClass";

const studentsList = [
  new Student("Charlie Chap", 18, "charlie@gmail.com", 2025, []),
  new Student("Emily Anderson", 22, "emily@gmail.com", 2024, [coursesList[1]]),
  new Student("Tom Bikkstad", 25, "tom@gmail.com", 2024, [coursesList[2]]),
  new Student("Anna Haug", 37, "anna@gmail.com", 2024, [coursesList[0], coursesList[1]]),
  new Student("Mona Ottar", 23, "mona@gmail.com", 2025, [coursesList[1]]),
];

export default studentsList;
