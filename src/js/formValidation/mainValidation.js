class MainValidation {
  static validateForm(fieldsToValidate, event) {
    let isvalid = true;

    for (let field of fieldsToValidate) {
      const validationMessage = document.querySelector(
        `.form__${field.name}-message`
      );

      const inputFields = document.querySelector(
        `#${field.name}, [name='${field.name}']`
      );

      console.log(field.name);

      if (inputFields) {
        console.log(`Found input:`, inputFields);
      } else {
        console.log(`Input not found for field:`, field.name);
      }

      validationMessage.style.display = "none";
      validationMessage.textContent = "";

      inputFields.addEventListener("input", () => {
        inputFields.classList.remove("form__invalid-input");
        validationMessage.textContent = "";
      });

      if (!inputFields.value.trim()) {
        inputFields.classList.add("form__invalid-input");
        validationMessage.style.display = "block";
        validationMessage.textContent = field.message;
        isvalid = false;
      }
    }
    if (!isvalid && event) {
      event.preventDefault();
    }
    return isvalid;
  }
}

export default MainValidation;
