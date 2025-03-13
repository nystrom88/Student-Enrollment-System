import CourseValidation from "../formValidation/courseValidation";
import Course from "./courseClass";
import CourseManagement from "./coursesManagement";
import appState from "../core/appState";

class UICourses {
  static courseForm = document.querySelector(".form__add-edit-course");
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
      studentNames.textContent = course.students;
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
        const confirmButton = document.querySelector(".delete-modal__confirm-button");
        this.showDeleteModal(course.courseName);

        if (this.previousConfirmDeleteEvent) {
          confirmButton.removeEventListener("click", this.previousConfirmDeleteEvent);
        }

        this.previousConfirmDeleteEvent = (e) => {
          CourseManagement.removeCourse(course.courseId);
          this.hideDeleteModal();
        };

        confirmButton.addEventListener("click", this.previousConfirmDeleteEvent);
      });

      // Edit course
      editButton.addEventListener("click", () => {
        this.renderEditForm(course.courseId);

        // Remove any existing submit event listener
        this.courseForm.removeEventListener("submit", this.handleFormSubmit);

        // Define new edit mode event listener
        this.handleFormSubmit = (e) => {
          e.preventDefault();

          const courseNameElement = document.querySelector(".form__course-name-input");
          const courseMaxStudentElement = document.querySelector(
            ".form__course-max-students-input"
          );

          const courseArray = CourseManagement.getCourses();
          const foundCourse = courseArray.find((c) => c.courseId === course.courseId);

          if (foundCourse) {
            foundCourse.courseName = courseNameElement.value.trim();
            foundCourse.maxStudents = courseMaxStudentElement.value.trim();

            CourseManagement.coursesList = courseArray;
            localStorage.setItem("coursesList", JSON.stringify(CourseManagement.coursesList));
            UICourses.renderCourses(CourseManagement.coursesList);
          }

          // Reset form after editing
          this.courseForm.reset();
          this.courseForm.classList.remove("form__add-edit-course--show");

          // Remove event listener to avoid duplication
          this.courseForm.removeEventListener("submit", this.handleFormSubmit);

          // Reset edit state
          appState.editState = false;
        };

        // Attach the new event listener for editing
        this.courseForm.addEventListener("submit", this.handleFormSubmit);
        appState.editState = true;
      });
    });
  }

  static renderEditForm(courseId) {
    const courseName = document.querySelector(".form__course-name-input");
    const courseMaxStudent = document.querySelector(".form__course-max-students-input");

    const submitButton = document.querySelector(".form__submit-button");
    this.courseForm.classList.add("form__add-edit-course--show");
    submitButton.textContent = "Confirm edit";

    const courseArray = CourseManagement.getCourses();
    const course = courseArray.find((course) => course.courseId === courseId);

    courseName.value = course.courseName;
    courseMaxStudent.value = course.maxStudents;
  }

  static initDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteModalCancelButton = document.querySelector(".delete-modal__cancel-button");

    deleteModalCancelButton.addEventListener("click", () => {
      deleteModal.classList.remove("delete-modal--show");
    });
  }

  static showDeleteModal(courseName) {
    const deleteModal = document.querySelector(".delete-modal");
    const modalMessage = document.querySelector(".delete-modal__message");
    deleteModal.classList.add("delete-modal--show");
    modalMessage.textContent = `Are you sure you want to delete the following course: ${courseName}`;
  }

  static hideDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    deleteModal.classList.remove("delete-modal--show");
  }

  static initAddEditCourseForm() {
    const addCourseButton = document.querySelector(".add-course__button");
    const formCancelButton = document.querySelector(".form__cancel-button");

    addCourseButton.addEventListener("click", () => {
      this.courseForm.classList.add("form__add-edit-course--show");
    });

    formCancelButton.addEventListener("click", () => {
      this.courseForm.classList.remove("form__add-edit-course--show");
      this.courseForm.reset();
    });
  }

  static addCourse() {
    if (appState.editState) {
      this.courseForm.removeEventListener("submit", this.handleFormSubmit);
    }

    this.handleFormSubmit = (e) => {
      e.preventDefault();

      if (!CourseValidation.validateCourse()) {
        return;
      }

      const courseName = document.querySelector(".form__course-name-input");
      const courseMaxStudent = document.querySelector(".form__course-max-students-input");

      const courseInstance = new Course(courseName.value.trim(), courseMaxStudent.value.trim());
      CourseManagement.addCourse(courseInstance);

      // Reset form and update UI
      this.courseForm.reset();
      UICourses.renderCourses(CourseManagement.getCourses());
      this.courseForm.classList.remove("form__add-edit-course--show");
    };

    this.courseForm.addEventListener("submit", this.handleFormSubmit);
    appState.editState = false; // Ensure it's in "add mode"
  }

  static init() {
    this.renderCourses(CourseManagement.getCourses());
    this.initAddEditCourseForm();
    this.initDeleteModal();
    this.addCourse();
  }
}

export default UICourses;
