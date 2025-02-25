// class Student extends Person {
//   constructor(name, email, id, studentId, enrollmentYear, courses = []) {
//     super(name, email, id);
//     this.studentId = studentId;
//     this.enrollmentYear = enrollmentYear;
//     this.courses = courses;
//   }

//   viewStudentList() {}

//   selectCourses() {}

//   addStudent() {}

//   editStudent() {}

//   removeStudent() {}
// }

class StudentManagement {
  static viewStudentList() {
    // Fetches data from the local storage or creates an Empty array if there is nothing stored
    const studentList = JSON.parse(localStorage.getItem("student-list")) || [];

    studentList.forEach((student) => {
      // Create/select Elements
      const listContainer = document.querySelector(".student-list-container");

      const studentContainer = document.createElement("div");
      const list = document.createElement("ul");
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
      listContainer.append(list);
      list.append(studentContainer);
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
      list.classList.add("student-list student-list-container");
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
      listElementName.textContent = this.name;
      listElementCourse1.textContent = this.courses[0];
      listElementCourse2.textContent = this.courses[1];
      listElementCourse3.textContent = this.courses[2];
      listElementEmail.textContent = this.email;
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
  static addStudent() {
    // Update studentList and local storage with newly added Student
    confirmAddButton.addStudent("click", () => {
      const studentList = JSON.parse(localStorage.getItem("student-list"));
      studentList.push(Student);
      localStorage.setItem("student-list", JSON.stringify(studentList));
      this.viewStudentList();
    });
  }
  static editStudent() {}
  static removeStudent() {}
}

export default StudentManagement;
