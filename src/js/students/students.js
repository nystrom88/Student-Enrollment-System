import StudentsManagement from "./studentsManagement";
import Student from "./studentsClass";
import StudentValidation from "../formValidation/studentValidation";
import appState from "../core/appState";

document.addEventListener("DOMContentLoaded", () => {
  StudentsManagement.viewStudentsList();
});

const formModal = document.querySelector(".form__add-edit-student-instructor");
const addStudentInstructor = document.querySelector(
  ".add-student-instructor__button"
);
const confirmButton = document.querySelector(
  ".form__add-student-instructor-button"
);
const cancelButton = document.querySelector(".form__cancel-button");
const coursesInput = document.querySelectorAll(".form__student-courses-select");

// Form
formModal.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!StudentValidation.validateStudent()) {
    return;
  }

  const studentName = document.querySelector(".form__student-name-input");
  const studentAge = document.querySelector(".form__student-age-input");
  const studentEmail = document.querySelector(".form__student-email-input");
  const studentEnrollmentYear = document.querySelector(
    ".form__student-enrollment-year-select"
  );

  const studentCourse1 = document.querySelector("#course1");
  const studentCourse2 = document.querySelector("#course2");
  const studentCourse3 = document.querySelector("#course3");

  const studentCourses = [
    studentCourse1.value,
    studentCourse2.value,
    studentCourse3.value,
  ];
  if (!appState.editingStudentId) {
    StudentsManagement.addStudent(
      studentName,
      studentAge,
      studentEmail,
      studentEnrollmentYear,
      studentCourses
    );
  } else {
    StudentsManagement.updateStudent(
      appState.editingStudentId,
      studentName.value,
      studentAge.value,
      studentEmail.value,
      studentEnrollmentYear.value,
      studentCourses
    );
  }
  formModal.reset();
  formModal.style.display = "none";
  populateCourses();
});

cancelButton.addEventListener("click", () => {
  formModal.reset();
  formModal.style.display = "none";

  // Reset courses inputs attributes in the form
  coursesInput[1].setAttribute("disabled", "true");
  coursesInput[2].setAttribute("disabled", "true");
});

const enableDisableCourseOptions = () => {
  if (coursesInput[0].value != "" && coursesInput[1].value != "") {
    coursesInput[1].removeAttribute("disabled");
    coursesInput[2].removeAttribute("disabled");
    // Removes the disabled attribute on second course upon selecting a first course
  } else if (coursesInput[0].value != "") {
    coursesInput[1].removeAttribute("disabled");
    // Disables course 2 and 3 if course 1 has been reset to unselected
  } else if (coursesInput[0].value === "") {
    coursesInput[1].setAttribute("disabled", "true");
    coursesInput[2].setAttribute("disabled", "true");
    coursesInput[1].selectedIndex = 0;
    coursesInput[2].selectedIndex = 0;
  }

  // Enables course 3 if course 2 has been selected
  if (coursesInput[1].value != "") {
    coursesInput[2].removeAttribute("disabled");
    // Disables course 3 if course 2 is unselected
  } else if (coursesInput[1].value === "") {
    coursesInput[2].setAttribute("disabled", "true");
    coursesInput[2].selectedIndex = 0;
  }
};

// Disable/enable course inputs based on selected
coursesInput[0].addEventListener("change", () => {
  enableDisableCourseOptions();
});
coursesInput[1].addEventListener("change", () => {
  enableDisableCourseOptions();
});

const populateCourses = () => {
  // Populate student form with Courses
  const coursesSelects = document.querySelectorAll(
    ".form__student-courses-select"
  );
  const coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];

  coursesSelects.forEach((select, i) => {
    select.innerHTML = "";

    const courseDefaultOption = document.createElement("option");
    select.append(courseDefaultOption);
    courseDefaultOption.textContent = "Unselected";
    courseDefaultOption.value = "";

    coursesList.forEach((course, j) => {
      const courseOption = document.createElement("option");
      select.append(courseOption);
      courseOption.textContent = course.courseName;
      courseOption.value = course.courseName;
      if (
        Number(coursesList[j].maxStudents) === coursesList[j].students.length
      ) {
        courseOption.disabled = true;
        courseOption.title = "This course has been maxed out";
      } else {
        courseOption.disabled = false;
        courseOption.title = "";
      }
    });
  });

  addStudentInstructor.addEventListener("click", () => {
    formModal.style.display = "flex";
    confirmButton.textContent = "Add Student";
    enableDisableCourseOptions();
  });
};

populateCourses();

export default enableDisableCourseOptions;
