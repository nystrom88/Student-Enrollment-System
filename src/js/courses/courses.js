import CourseManagement from "./coursesManagement";

CourseManagement.addCourse("Film");
CourseManagement.addCourse("TV");

console.log(CourseManagement.coursesList);

// Create/Append Elements
const listSection = document.createElement("section");
const list = document.createElement("ul");
const listInformation = document.createElement("li");
const listBox = document.createElement("div");
const instructurName = document.createElement("h3");
const studentNames = document.createElement("h4");
const listText = document.createElement("p");
