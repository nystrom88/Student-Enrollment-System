class MainValidation {
  static validateForm(fieldsToValidate) {
    let isValid = true;

    for (let field of fieldsToValidate) {
      const validationMessage = document.querySelector(
        `.form__${field.name}-message`
      );

      const inputFields = document.querySelector(
        `#${field.name}, [name='${field.name}']`
      );

      console.log(validationMessage);

      validationMessage.style.display = "none";
      // validationMessage.classList.remove("form__validation-message");
      validationMessage.textContent = "";

      inputFields.addEventListener("input", () => {
        inputFields.classList.remove("form__invalid-input");
        validationMessage.textContent = "";
      });

      if (!inputFields.value.trim()) {
        inputFields.classList.add("form__invalid-input");
        validationMessage.style.display = "block";
        // validationMessage.classList.add("form__validation-message");
        validationMessage.textContent = field.message;
        isValid = false;
      }
    }
    return isValid;
  }
}

export default MainValidation;
