class MainValidation {
  static(fieldsToValidate) {
    const validationMessage = document.querySelector(".validation-message");
    validationMessage.style.display = "none";

    for (let field of validateForm) {
      //   const validationFieldMessage = document.querySelector(
      //     `.form__${fieldsToValidate.name}-message`
      //   );

      const inputFields = document.querySelector(`id${field.name}`);

      inputFields.addEventListener("input", () => {
        inputFields.classList.remove("form__invalid-input");
        validationMessage.textContent = "";
      });

      if (!inputFields.value.trim()) {
        inputFields.classList.add("form__invalid-input");
        validationMessage.style.display = "block";
        validationMessage.textContent = field.message;
        return false;
      }
    }
    return true;
  }
}

export default MainValidation;
