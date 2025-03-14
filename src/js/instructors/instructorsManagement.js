import appState from "../core/appState";
import CourseManagement from "../courses/coursesManagement";
import enableDisableCourseOptions from "./instructors";
import Instructor from "./instructorsClass";
// import instructorsList from "./instructorsList";

class InstructorManagement {
  static getInstructors = () => JSON.parse(localStorage.getItem("instructors-list")) || [];

  static viewInstructorsList() {
    // Fetches data from the local storage or creates an Empty array if there is nothing stored
    // const instructorList = JSON.parse(localStorage.getItem("instructor-list")) || [];

    const listContainer = document.querySelector(".instructor-list__list");
    listContainer.innerHTML = "";

    const formModal = document.querySelector(".form__add-edit-student-instructor");
    const instructorsList = this.getInstructors();

    instructorsList.forEach((instructor, i) => {
      // Create/select Elements
      const listElement = document.createElement("li");
      const instructorContainer = document.createElement("div");
      const listElementName = document.createElement("li");
      const listCourses = document.createElement("ul");
      const listElementCourse1 = document.createElement("li");
      const listElementCourse2 = document.createElement("li");
      const listElementCourse3 = document.createElement("li");
      const listElementEmail = document.createElement("li");
      const toolsContainer = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      const confirmButton = document.querySelector(".form__add-student-instructor-button");

      // Appending
      listContainer.append(listElement);
      listElement.append(instructorContainer);
      instructorContainer.append(listElementName, listCourses, listElementEmail, toolsContainer);
      listCourses.append(listElementCourse1, listElementCourse2, listElementCourse3);
      toolsContainer.append(editButton, deleteButton);

      // Applying classes
      instructorContainer.classList.add("instructor-container");
      listElement.classList.add("instructor-list", "instructor-list-container");
      listElementName.classList.add("instructor-list__name");
      listCourses.classList.add("instructor-list__courses");
      listElementCourse1.classList.add("instructor-list__course1");
      listElementCourse2.classList.add("instructor-list__course2");
      listElementCourse3.classList.add("instructor-list__course3");
      listElementEmail.classList.add("instructor-list__email");
      toolsContainer.classList.add("instructor-list__tools-container");
      editButton.classList.add("tools__edit-button");
      deleteButton.classList.add("tools__delete-button");

      // Adding content
      listElementName.textContent = instructorsList[i].name;
      listElementCourse1.textContent = instructorsList[i].courses[0];
      listElementCourse2.textContent = instructorsList[i].courses[1];
      listElementCourse3.textContent = instructorsList[i].courses[2];
      listElementEmail.textContent = instructorsList[i].email;
      editButton.textContent = "🖊️";
      deleteButton.textContent = "🗑️";

      editButton.addEventListener("click", () => {
        this.editInstructor(instructor.id);
        formModal.style.display = "flex";
        confirmButton.textContent = "Confirm Edit";
      });

      deleteButton.addEventListener("click", () => {
        const deleteModal = document.querySelector(".delete-modal");
        const confirmDeleteButton = document.querySelector(".delete-modal__confirm-button");
        const declineDeleteButton = document.querySelector(".delete-modal__cancel-button");

        deleteModal.classList.add("delete-modal--show");

        confirmDeleteButton.addEventListener("click", () => {
          this.removeInstructor(instructor.id);
          // student.id = "";
          deleteModal.classList.remove("delete-modal--show");
        });

        declineDeleteButton.addEventListener("click", () => {
          deleteModal.classList.remove("delete-modal--show");
        });
      });
    });
  }

  static addInstructors(instructorName, instructorAge, instructorEmail, instructorCourses) {
    // Update InstructorsList and local storage with newly added Instructor
    let instructorsList = this.getInstructors();

    const newInstructor = new Instructor(
      instructorName.value,
      instructorAge.value,
      instructorEmail.value,
      instructorCourses
    );

    instructorsList.push(newInstructor);
    localStorage.setItem("instructors-list", JSON.stringify(instructorsList));
    this.viewInstructorsList();
    this.AddInstructorToCourseList(newInstructor);
  }

  // Push instructor into CourseList
  static AddInstructorToCourseList(newInstructor) {
    const coursesList = CourseManagement.getCourses();
    newInstructor.courses.forEach((courseName) => {
      coursesList.forEach((c) => {
        // Checks if the courses name matches and pushes instructor into its corresponding course
        if (courseName === c.courseName) {
          c.instructor = newInstructor;
        }
      });
    });
    localStorage.setItem("coursesList", JSON.stringify(coursesList));
  }

  static editInstructor(id) {
    const instructorsList = this.getInstructors();
    const instructorNameInput = document.querySelector(".form__instructor-name-input");
    const instructorAgeInput = document.querySelector(".form__instructor-age-input");
    const instructorCourse1Select = document.querySelector("#instructor-courses1");
    const instructorCourse2Select = document.querySelector("#instructor-courses2");
    const instructorCourse3Select = document.querySelector("#instructor-courses3");
    const instructorEmailInput = document.querySelector(".form__instructor-email-input");

    const instructorToEdit = instructorsList.find((instructor) => instructor.id === id);

    instructorNameInput.value = instructorToEdit.name;
    instructorAgeInput.value = instructorToEdit.age;
    instructorCourse1Select.value = instructorToEdit.courses[0];
    instructorCourse2Select.value = instructorToEdit.courses[1];
    instructorCourse3Select.value = instructorToEdit.courses[2];
    instructorEmailInput.value = instructorToEdit.email;

    appState.editingInstructortId = instructorToEdit.id;

    enableDisableCourseOptions();
  }

  static updateInstructor(id, instructorName, instructorAge, instructorEmail, instructorCourses) {
    const instructorList = this.getInstructors();

    const instructorToUpdate = instructorList.find((instructor) => instructor.id === id);

    if (instructorToUpdate) {
      instructorToUpdate.name = instructorName;
      instructorToUpdate.age = instructorAge;
      instructorToUpdate.email = instructorEmail;
      instructorToUpdate.courses = instructorCourses;

      localStorage.setItem("instructors-list", JSON.stringify(instructorList));
      this.viewInstructorsList();
      appState.editingInstructorId = null;
    }
  }

  static removeInstructor(id) {
    const instructorsList = this.getInstructors();

    // Remove instructor name from courses
    const courseList = CourseManagement.getCourses();
    const updatedCourses = courseList.map((course) => {
      if (course.instructor.id === id) {
        return { ...course, instructor: { ...course.instructor, name: undefined } };
      }
      return course;
    });
    CourseManagement.coursesList = updatedCourses;
    localStorage.setItem("coursesList", JSON.stringify(CourseManagement.coursesList));

    // Delete instructor
    const filteredInstructors = instructorsList.filter((instructor) => instructor.id !== id);
    localStorage.setItem("instructors-list", JSON.stringify(filteredInstructors));

    this.viewInstructorsList();
  }
}

export default InstructorManagement;
