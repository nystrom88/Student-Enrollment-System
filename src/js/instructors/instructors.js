import InstructorsManagement from "./instructorsManagement";
import Instructor from "./instructorsClass";
import InstructorValidation from "../formValidation/instructorValidation";

document.addEventListener("DOMContentLoaded", () => {
  InstructorsManagement.viewInstructorsList();
});

const formModal = document.querySelector(".form__add-edit-student-instructor");
const addStudentInstructor = document.querySelector(
  ".add-student-instructor__button"
);
const cancelButton = document.querySelector(".form__cancel-button");
const coursesInput = document.querySelectorAll(
  ".form__instructor-courses-select"
);

// Form
formModal.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!InstructorValidation.validateInstructor()) {
    return;
  }

  const instructorName = document.querySelector(".form__instructor-name-input");
  const instructorAge = document.querySelector(".form__instructor-age-input");
  const instructorEmail = document.querySelector(
    ".form__instructor-email-input"
  );

  const instructorCourse1 = document.querySelector("#course1");
  const instructorCourse2 = document.querySelector("#course2");
  const instructorCourse3 = document.querySelector("#course3");

  const instructorCourses = [
    instructorCourse1.value,
    instructorCourse2.value,
    instructorCourse3.value,
  ];

  InstructorsManagement.addInstructors(
    instructorName,
    instructorAge,
    instructorEmail,
    instructorCourses
  );
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

// Populate instructor form with Courses
const coursesSelects = document.querySelectorAll(
  ".form__instructor-courses-select"
);
const coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];

coursesSelects.forEach((select) => {
  coursesList.forEach((course, i) => {
    const courseOption = document.createElement("option");
    select.append(courseOption);
    courseOption.textContent = course.courseName;
    courseOption.value = course.courseName;

    console.log(coursesList[i].maxInstructors);
    console.log(coursesList[i].instructors.length);

    if (
      Number(coursesList[i].maxInstructors) ===
      coursesList[i].instructors.length
    ) {
      courseOption.disabled = true;
      courseOption.title = "This course has been maxed out";
    } else {
      courseOption.disabled = false;
      courseOption.title = "";
    }
  });
});
