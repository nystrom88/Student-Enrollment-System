class MainValidation {
  static validateForm(fieldsToValidate) {
    let isValid = true;

    for (let field of fieldsToValidate) {
      const validationMessage = document.querySelector(
        `.form__${field.name}-message`
      );
      console.log(validationMessage);

      const inputFields = document.querySelector(
        `#${field.name}, [name='${field.name}']`
      );

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
        isValid = false;
      }
    }
    return isValid;
  }
}

export default MainValidation;
