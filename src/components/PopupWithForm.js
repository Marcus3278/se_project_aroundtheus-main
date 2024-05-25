import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    // Ensure the popup element exists
    if (!this.popupElement) {
      throw new Error(`Popup element with selector "${popupSelector}" not found`);
    }

    // Cache selectors for efficiency
    this.popupForm = this.popupElement.querySelector(selectors.popupForm);
    this.inputElements = this.popupForm.querySelectorAll(selectors.popupInput);
    this.submitButtonElement = this.popupElement.querySelector(selectors.submitButtonSelector);

    if (!this.popupForm) {
      throw new Error(`Form element with selector "${selectors.popupForm}" not found`);
    }
    if (!this.submitButtonElement) {
      throw new Error(`Submit button with selector "${selectors.submitButtonSelector}" not found`);
    }

    this.handleFormSubmit = handleFormSubmit;
    if (typeof this.handleFormSubmit !== 'function') {
      throw new Error('handleFormSubmit should be a function');
    }

    this.progressButtonText = selectors.savingButtonText || 'Saving...';
    this.defaultButtonText = selectors.saveButtonDefaultText || 'Save';
  }

  // Method to get input values from the form
  getInputValues() {
    const inputValues = {};
    this.inputElements.forEach(element => {
      inputValues[element.name] = element.value;
    });
    return inputValues;
  }

  // Method to set input values in the form
  setInputValues(data) {
    this.inputElements.forEach(input => {
      input.value = data[input.name];
    });
  }

  // Method to set event listeners
  setEventListeners() {
    this.popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
    super.setEventListeners();
  }

  // Method to show button progress
  renderLoading(isLoading, loadingText = this.progressButtonText) {
    this.submitButtonElement.textContent = isLoading ? loadingText : this.defaultButtonText;
  }

  // Method to reset the form
  reset() {
    this.popupForm.reset();
  }

  close() {
    super.close();
    this.reset();
  }
}

