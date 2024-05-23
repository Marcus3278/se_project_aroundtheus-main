export default class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
    this.inputElements = Array.from(form.querySelectorAll(config.inputSelector));
    this.submitButton = form.querySelector(config.submitButtonSelector);
  }

  showError(input) {
    const errorMessage = this.form.querySelector(`#${input.id}-error`);
    input.classList.add(this.config.inputErrorClass);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this.config.errorClass);
  }

  hideError(input) {
    const errorMessage = this.form.querySelector(`#${input.id}-error`);
    input.classList.remove(this.config.inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this.config.errorClass);
  }

  checkInputValidity(input) {
    if (!input.validity.valid) {
      this.showError(input);
    } else {
      this.hideError(input);
    }
  }

  hasInvalidInput() {
    return !this.inputElements.every((input) => input.validity.valid);
  }

  enableButton() {
    this.submitButton.classList.remove(this.config.inactiveButtonClass);
    this.submitButton.disabled = false;
  }

  disableButton() {
    this.submitButton.classList.add(this.config.inactiveButtonClass);
    this.submitButton.disabled = true;
  }

  setEventListeners() {
    this.inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }

  resetValidation() {
    this.inputElements.forEach((input) => {
      this.hideError(input);
    });
    this.toggleButtonState();
  }
}

