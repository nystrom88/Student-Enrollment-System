import Instructor from "./instructorsClass";
// import instructorsList from "./instructorsList";

class InstructorManagement {
  static viewInstructorsList() {
    // Fetches data from the local storage or creates an Empty array if there is nothing stored
    // const instructorList = JSON.parse(localStorage.getItem("instructor-list")) || [];

    const listContainer = document.querySelector(".instructor-list__list");
    listContainer.innerHTML = "";

    const instructorsList =
      JSON.parse(localStorage.getItem("instructors-list")) || [];
    console.log(instructorsList);

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

      // Appending
      listContainer.append(listElement);
      listElement.append(instructorContainer);
      instructorContainer.append(
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
        // Populate and open form ^
      });

      deleteButton.addEventListener("click", () => {
        this.removeInstructor();
      });
    });
  }

  static addInstructors(
    instructorName,
    instructorAge,
    instructorEmail,
    instructorCourses
  ) {
    // Update studentsList and local storage with newly added Student
    const instructorsList =
      JSON.parse(localStorage.getItem("instructors-list")) || [];
    const newInstructor = new Instructor(
      instructorName.value,
      instructorAge.value,
      instructorEmail.value,
      instructorCourses
    );

    instructorsList.push(newInstructor);
    localStorage.setItem("instructors-list", JSON.stringify(instructorsList));
    this.viewInstructorsList();
  }

  // Push instructor into CourseList
  static AddInstructorToCourseList(instructor) {
    const coursesList = JSON.parse(localStorage.getItem("coursesList")) || [];
    instructor.courses.forEach((courseName) => {
      coursesList.forEach((course) => {
        // Checks if the courses name matches and pushes instructor into its corresponding course
        if (courseName === course.courseName) {
          course.instructor.push(instructor);
        }
      });
    });
    localStorage.setItem("coursesList", JSON.stringify(coursesList));
  }

  static editInstructor(id) {
    console.log("editing instructor");

    const instructorsList =
      JSON.parse(localStorage.getItem("instructor-list")) || [];
    const instructorNameInput = document.querySelector(
      ".form__instructor-name-input"
    );
    const instructorAgeInput = document.querySelector(
      ".form__instructor-age-input"
    );
    const instructorCourse1Select = document.querySelector("#course1");
    const instructorCourse2Select = document.querySelector("#course2");
    const instructorCourse3Select = document.querySelector("#course3");
    const instructorEmailInput = document.querySelector(
      ".form__instructor-email-input"
    );

    const instructorToEdit = instructorsList.find(
      (instructor) => instructor.id === id
    );
    console.log(instructorToEdit);

    instructorNameInput.value = instructorToEdit.name;
    instructorAgeInput.value = instructorToEdit.age;
    instructorCourse1Select.value = instructorToEdit.courses[0];
    instructorCourse2Select.value = instructorToEdit.courses[1];
    instructorCourse3Select.value = instructorToEdit.courses[2];
    instructorEmailInput.value = instructorToEdit.email;
  }

  static removeInstructor(instructorId) {
    const instructorsList =
      JSON.parse(localStorage.getItem("instructors-list")) || [];
    const filteredInstructor = instructorsList.filter(
      (instructor) => instructor.instructorId !== instructorId
    );
    localStorage.setItem(
      "instructors-list",
      JSON.stringify(filteredInstructor)
    );
    this.viewInstructorsList();
  }
}

export default InstructorManagement;
