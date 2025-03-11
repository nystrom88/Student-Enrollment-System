import Student from "./studentsClass";
import studentsList from "./studentsList";

class StudentManagement {
  static viewStudentsList() {
    // Fetches data from the local storage or creates an Empty array if there is nothing stored
    // const studentList = JSON.parse(localStorage.getItem("student-list")) || [];

    const listContainer = document.querySelector(".student-list__list");
    listContainer.innerHTML = "";

    studentsList.forEach((student, i) => {
      // Create/select Elements
      const listElement = document.createElement("li");
      const studentContainer = document.createElement("div");
      const listElementName = document.createElement("li");
      const listCourses = document.createElement("ul");
      const listElementCourse1 = document.createElement("li");
      const listElementCourse2 = document.createElement("li");
      const listElementCourse3 = document.createElement("li");
      const listElementEmail = document.createElement("li");
      const toolsContainer = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      // Appending
      listContainer.append(listElement);
      listElement.append(studentContainer);
      studentContainer.append(
        listElementName,
        listCourses,
        listElementEmail,
        toolsContainer
      );
      listCourses.append(
        listElementCourse1,
        listElementCourse2,
        listElementCourse3
      );
      toolsContainer.append(editButton, deleteButton);

      // Applying classes
      studentContainer.classList.add("student-container");
      listElement.classList.add("student-list", "students-list-container");
      listElementName.classList.add("student-list__name");
      listCourses.classList.add("student-list__courses");
      listElementCourse1.classList.add("student-list__course1");
      listElementCourse2.classList.add("student-list__course2");
      listElementCourse3.classList.add("student-list__course3");
      listElementEmail.classList.add("student-list__email");
      toolsContainer.classList.add("student-list__tools-container");
      editButton.classList.add("tools__edit-button");
      deleteButton.classList.add("tools__delete-button");

      // Adding content
      listElementName.textContent = studentsList[i].name;
      listElementCourse1.textContent =
        studentsList[i].courses[0]?.courseName || "";
      listElementCourse2.textContent =
        studentsList[i].courses[1]?.courseName || "";
      listElementCourse3.textContent =
        studentsList[i].courses[2]?.courseName || "";
      listElementEmail.textContent = studentsList[i].email;
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";

      editButton.addEventListener("click", () => {
        // Populate and open form ^
      });

      deleteButton.addEventListener("click", () => {
        // Pop asking to delete student with id ^
      });
    });
  }

  static addStudent(
    studentName,
    studentAge,
    studentEmail,
    studentEnrollmentYear,
    studentCourses
  ) {
    // Update studentsList and local storage with newly added Student
    const studentsList = JSON.parse(localStorage.getItem("student-list")) || [];
    const newStudent = new Student(
      studentName.value,
      studentAge.value,
      studentEmail.value,
      studentEnrollmentYear.value,
      studentCourses.value
    );

    console.log(newStudent);

    studentsList.push(newStudent);
    localStorage.setItem("student-list", JSON.stringify(studentsList));
    this.viewStudentsList();
  }

  static editStudent() {}
  static removeStudent() {}
}

export default StudentManagement;
