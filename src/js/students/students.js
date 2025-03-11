import StudentsManagement from "./studentsManagement";
import Student from "./studentsClass";
import StudentValidation from "../formValidation/studentValidation";

document.addEventListener("DOMContentLoaded", () => {
  StudentsManagement.viewStudentList();
});

const formModal = document.querySelector(".form__add-edit-student-instructor");
const addStudentInstructor = document.querySelector(
  ".add-student-instructor__button"
);
const cancelButton = document.querySelector(".form__cancel-button");
const coursesInput = document.querySelectorAll(".form-group__courses-select");

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  StudentsManagement.addStudent();
  StudentValidation.validateStudent();
  formModal.reset();
  formModal.style.display = "none";
});

addStudentInstructor.addEventListener("click", () => {
  formModal.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
  formModal.reset();
  formModal.style.display = "none";

  // Reset courses inputs attributes in the form
  coursesInput[1].setAttribute("disabled", "true");
  coursesInput[2].setAttribute("disabled", "true");
});

// Disable/enable course inputs based on selected
coursesInput[0].addEventListener("change", () => {
  // Makes it so second and third input is enabled if they have already had something selected on it
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
});

coursesInput[1].addEventListener("change", () => {
  // Enables course 3 if course 2 has been selected
  if (coursesInput[1].value != "") {
    coursesInput[2].removeAttribute("disabled");
    // Disables course 3 if course 2 is unselected
  } else if (coursesInput[1].value === "") {
    coursesInput[2].setAttribute("disabled", "true");
    coursesInput[2].selectedIndex = 0;
  }
});
