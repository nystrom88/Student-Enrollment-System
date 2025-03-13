import MainValidation from "./mainValidation";

class CourseValidation extends MainValidation {
  static fieldsToValidate = [
    { name: "course-name", message: "Please Enter Course Name" },
    {
      name: "course-max-students",
      message: "Please Enter The Max Limit of Students",
    },
  ];

  static validateCourse() {
    return CourseValidation.validateForm(this.fieldsToValidate);
  }
}

export default CourseValidation;
