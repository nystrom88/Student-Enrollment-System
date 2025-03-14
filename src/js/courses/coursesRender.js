import CourseValidation from "../formValidation/courseValidation";
import Course from "./courseClass";
import CourseManagement from "./coursesManagement";

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
        const confirmButton = document.querySelector(
          ".delete-modal__confirm-button"
        );
        this.showDeleteModal(course.courseName);

        if (this.prevousConfirmDeleteEvent) {
          confirmButton.removeEventListener(
            "click",
            this.prevousConfirmDeleteEvent
          );
        }

        this.prevousConfirmDeleteEvent = (e) => {
          CourseManagement.removeCourse(course.courseId);
          this.hideDeleteModal();
        };

        confirmButton.addEventListener("click", this.prevousConfirmDeleteEvent);
      });

      // Edit course
      editButton.addEventListener("click", () => {
        console.log("Button pressed");
      });
    });
  }

  static confirmDelete() {}

  static initDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteModalCancelButton = document.querySelector(
      ".delete-modal__cancel-button"
    );

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
    const courseName = document.querySelector(".form__course-name-input");
    const courseMaxStudent = document.querySelector(
      ".form__course-max-students-input"
    );

    this.courseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!CourseValidation.validateCourse()) {
        return;
      }

      const courseInstance = new Course(
        courseName.value,
        courseMaxStudent.value
      );
      CourseManagement.addCourse(courseInstance);
    });
  }

  static init() {
    this.renderCourses(CourseManagement.getCourses());
    this.initAddEditCourseForm();
    this.initDeleteModal();
    this.addCourse();
  }
}

export default UICourses;
