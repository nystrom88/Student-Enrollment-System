import CourseManagement from "./coursesManagement";
import appState from "../core/appState";

class UICourses {
  static courseForm = document.querySelector(".form__add-edit-course");
  static deleteModal = document.querySelector(".delete-modal");
  static prevousConfirmDeleteEvent = null;

  static renderCourses(coursesList) {
    const coursesListElement = document.querySelector(".course-list");
    coursesListElement.innerHTML = "";

    coursesList.forEach((course) => {
      // Step 1: Create Elements
      const li = document.createElement("li");
      const textContainer = document.createElement("div");
      const container = document.createElement("div");
      const title = document.createElement("h2");
      const instructorContainer = document.createElement("div");
      const instructorTitle = document.createElement("h3");
      const studentsContainer = document.createElement("div");
      const studentsTitle = document.createElement("h4");
      const studentsDetails = document.createElement("div");
      const studentNames = document.createElement("p");
      const maxStudentsInfo = document.createElement("p");
      const buttonsContainer = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      // Step 2: Add Classes
      li.classList.add("course-list__item");
      textContainer.classList.add("course-list__text-container");
      container.classList.add("course-list__container");
      title.classList.add("course-title__course-title");
      instructorContainer.classList.add("course-list__instructur");
      instructorTitle.classList.add("course-list__instructor-title");
      studentsContainer.classList.add("course-list__students");
      studentNames.classList.add("course-list__students-names");
      maxStudentsInfo.classList.add("course-list__max-students");
      buttonsContainer.classList.add("course-list__buttons-container");
      editButton.classList.add("course-list__edit-button");
      deleteButton.classList.add("course-list__delete-button");

      // Step 3: Add Content
      title.textContent = course.courseName;
      instructorTitle.textContent = `Instructor: ${course.instructor}`;

      studentsTitle.textContent = "Students:";
      const studentNamesArray = course.students.map((s) => s.name);
      studentNames.textContent = studentNamesArray.join(", ");
      maxStudentsInfo.textContent = `${course.students.length}/${course.maxStudents}`;

      editButton.textContent = "🖊️";
      deleteButton.textContent = "🗑️";

      // Step 4: Append Elements Together
      coursesListElement.append(li);
      li.append(textContainer, buttonsContainer);
      textContainer.append(container, instructorContainer, studentsContainer);
      container.append(title);
      instructorContainer.append(instructorTitle);
      studentsContainer.append(studentsTitle, studentsDetails);
      studentsDetails.append(studentNames, maxStudentsInfo);
      buttonsContainer.append(editButton, deleteButton);

      // Delete course
      deleteButton.addEventListener("click", () => {
        this.openDeleteModal(course.courseName); // Open modal.

        deleteCourse(); // Where to add delete course???

        const confirmButton = document.querySelector(".delete-modal__confirm-button");
        this.openDeleteModal(course.courseName);

        if (this.prevousConfirmDeleteEvent) {
          confirmButton.removeEventListener("click", this.prevousConfirmDeleteEvent);
        }

        this.previousConfirmDeleteEvent = (e) => {
          CourseManagement.removeCourse(course.courseId);
          this.hideDeleteModal();
        };

        confirmButton.addEventListener("click", this.previousConfirmDeleteEvent);
      });

      // Edit course
      editButton.addEventListener("click", () => {
        this.openFormModal();
        this.populateFormFields(course.courseId);
      });
    });
  }

  static initFormModal = () => {
    const addCourseButton = document.querySelector(".add-course__button");
    addCourseButton.addEventListener("click", () => {
      this.openFormModal();
    });

    const formCancelButton = document.querySelector(".form__cancel-button");
    formCancelButton.addEventListener("click", () => {
      this.closeFormModal();
    });

    this.courseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const courseNameInput = document.querySelector(".form__course-name-input");
      const courseMaxStudentsInput = document.querySelector(".form__course-max-students-input");
      if (!appState.editState) {
        CourseManagement.addCourse(courseNameInput, courseMaxStudentsInput);
      } else {
        CourseManagement.editCourse(appState.editState, courseNameInput, courseMaxStudentsInput);
        appState.editState = null;
        this.closeFormModal();
      }

      UICourses.renderCourses(CourseManagement.coursesList);
      this.courseForm.reset();
    });
  };

  static openFormModal = () => this.courseForm.classList.add("form__add-edit-course--show");

  static closeFormModal = () => this.courseForm.classList.remove("form__add-edit-course--show");

  static populateFormFields(id) {
    const courseNameInput = document.querySelector(".form__course-name-input");
    const courseMaxStudentsInput = document.querySelector(".form__course-max-students-input");

    const courses = CourseManagement.getCourses();
    const course = courses.find((course) => course.courseId === id);

    courseNameInput.value = course.courseName;
    courseMaxStudentsInput.value = course.maxStudents;

    document.querySelector(".form__submit-button").textContent = "Confirm Edit";
    appState.editState = id;
  }

  static initDeleteModal = () => {
    const deleteModalCancelButton = document.querySelector(".delete-modal__cancel-button");
    deleteModalCancelButton.addEventListener("click", () => {
      this.closeDeleteModal();
    });
  };

  static openDeleteModal(courseName) {
    this.deleteModal.classList.add("delete-modal--show");
    const modalMessage = document.querySelector(".delete-modal__message");
    modalMessage.textContent = `Are you sure you want to delete the following course: ${courseName}`;
  }

  static closeDeleteModal = () => this.deleteModal.classList.remove("delete-modal--show");

  static init() {
    this.renderCourses(CourseManagement.getCourses());
    this.initFormModal();
    this.initDeleteModal();
  }
}

export default UICourses;
