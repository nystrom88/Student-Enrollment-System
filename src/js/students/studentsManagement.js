import appState from "../core/appState";
import enableDisableCourseOptions from "./students";
import Student from "./studentsClass";
// import studentsList from "./studentsList";

class StudentManagement {
  static viewStudentsList() {
    // Fetches data from the local storage or creates an Empty array if there is nothing stored
    // const studentList = JSON.parse(localStorage.getItem("student-list")) || [];

    const listContainer = document.querySelector(".student-list__list");
    listContainer.innerHTML = "";

    const formModal = document.querySelector(
      ".form__add-edit-student-instructor"
    );
    const studentsList = JSON.parse(localStorage.getItem("student-list")) || [];
    console.log(studentsList);

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
      const confirmButton = document.querySelector(
        ".form__add-student-instructor-button"
      );

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
      listElementCourse1.textContent = studentsList[i].courses[0];
      listElementCourse2.textContent = studentsList[i].courses[1];
      listElementCourse3.textContent = studentsList[i].courses[2];
      listElementEmail.textContent = studentsList[i].email;
      editButton.innerHTML = '<i class="fa-solid fa-user-pen"></i>';
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

      editButton.addEventListener("click", () => {
        this.editStudent(student.id);
        formModal.style.display = "flex";
        confirmButton.textContent = "Confirm Edit";
      });

      deleteButton.addEventListener("click", () => {
        const deleteModal = document.querySelector(".delete-modal");
        const confirmDeleteButton = document.querySelector(
          ".delete-modal__confirm-button"
        );
        const declineDeleteButton = document.querySelector(
          ".delete-modal__cancel-button"
        );
        deleteModal.classList.add("delete-modal--show");

        confirmDeleteButton.addEventListener("click", () => {
          this.removeStudent(student.id);
          student.id = "";
          deleteModal.classList.remove("delete-modal--show");
        });

        declineDeleteButton.addEventListener("click", () => {
          deleteModal.classList.remove("delete-modal--show");
        });
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
      studentCourses
    );

    studentsList.push(newStudent);
    localStorage.setItem("student-list", JSON.stringify(studentsList));
    this.viewStudentsList();
    this.AddStudentToCourseList(newStudent);
  }

  // Push student into CourseList
  static AddStudentToCourseList(student) {
    const coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    student.courses.forEach((courseName) => {
      coursesList.forEach((course) => {
        // Checks if the courses name matches and pushes student into its corresponding course
        if (courseName === course.courseName) {
          course.students.push(student);
        }
      });
    });
    localStorage.setItem("coursesList", JSON.stringify(coursesList));
  }

  static editStudent(id) {
    console.log("editing student");

    const studentsList = JSON.parse(localStorage.getItem("student-list")) || [];
    const studentNameInput = document.querySelector(
      ".form__student-name-input"
    );
    const studentAgeInput = document.querySelector(".form__student-age-input");
    const studentCourse1Select = document.querySelector("#course1");
    const studentCourse2Select = document.querySelector("#course2");
    const studentCourse3Select = document.querySelector("#course3");
    const studentEnrollmentYearInput = document.querySelector(
      ".form__student-enrollment-year-select"
    );
    const studentEmailInput = document.querySelector(
      ".form__student-email-input"
    );

    const studentToEdit = studentsList.find((student) => student.id === id);

    studentNameInput.value = studentToEdit.name;
    studentAgeInput.value = studentToEdit.age;
    studentCourse1Select.value = studentToEdit.courses[0];
    studentCourse2Select.value = studentToEdit.courses[1];
    studentCourse3Select.value = studentToEdit.courses[2];
    studentEnrollmentYearInput.value = studentToEdit.enrollmentYear;
    studentEmailInput.value = studentToEdit.email;

    appState.editingStudentId = studentToEdit.id;

    enableDisableCourseOptions();
  }

  static updateStudent(
    id,
    studentName,
    studentAge,
    studentEmail,
    studentEnrollmentYear,
    studentCourses
  ) {
    const studentsList = JSON.parse(localStorage.getItem("student-list")) || [];

    const studentToUpdate = studentsList.find((student) => student.id === id);

    if (studentToUpdate) {
      studentToUpdate.name = studentName;
      studentToUpdate.age = studentAge;
      studentToUpdate.email = studentEmail;
      studentToUpdate.enrollmentYear = studentEnrollmentYear;
      studentToUpdate.courses = studentCourses;

      localStorage.setItem("student-list", JSON.stringify(studentsList));
      this.viewStudentsList();
      appState.editingStudentId = null;
    }
  }

  static removeStudent(studentId) {
    const studentsList = JSON.parse(localStorage.getItem("student-list")) || [];
    const filteredStudents = studentsList.filter(
      (student) => student.id !== studentId
    );
    localStorage.setItem("student-list", JSON.stringify(filteredStudents));
    this.viewStudentsList();
  }
}

export default StudentManagement;
