class UICourses {
  static renderCourses(courseList) {
    const courseListElement = document.querySelector(".course-list");
    courseList.forEach((course) => {
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
      courseListElement.append(li);
      li.append(textContainer, buttonsContainer);
      textContainer.append(container, instructorContainer, studentsContainer);
      container.append(title);
      instructorContainer.append(instructorTitle);
      studentsContainer.append(studentsTitle, studentsDetails);
      studentsDetails.append(studentNames, maxStudentsInfo);
      buttonsContainer.append(editButton, deleteButton);
    });
  }
}

export default UICourses;
