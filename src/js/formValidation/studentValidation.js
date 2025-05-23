import MainValidation from "./mainValidation";

class StudentValidation extends MainValidation {
  static fieldsToValidate = [
    { name: "student-name", message: "Please Enter Your Name" },
    { name: "student-age", message: "Please Enter Your Age" },
    { name: "course1", message: "Please Choose a Course" },
    {
      name: "student-enrollment-year",
      message: "Please Add Your Enrollment Year",
    },
    { name: "student-email", message: "Please Enter Your Email" },
  ];

  static validateStudent() {
    return StudentValidation.validateForm(this.fieldsToValidate);
  }
}

export default StudentValidation;
