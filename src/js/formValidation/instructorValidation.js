import MainValidation from "./mainValidation";

class InstructorValidation extends MainValidation {
  static fieldsToValidate = [
    { name: "instructor-name", message: "Please Enter Your Name" },
    { name: "instructor-age", message: "Please Enter Your Age" },
    { name: "instructor-courses1", message: "Please Choose A Course" },
    { name: "instructor-email", message: "Please Enter Your E-mail" },
  ];
  static validateInstructor() {
    return InstructorValidation.validateForm(this.fieldsToValidate);
  }
}

export default InstructorValidation;
