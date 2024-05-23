import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this.popupElement.querySelector(selectors.popupForm);
    this.inputElements = this.popupForm.elements;
    this.submitButtonElement = this.popupElement.querySelector(selectors.submitButtonSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.progressButtonText = selectors.savingButtonText;
    this.defaultButtonText = selectors.saveButtonDefaultText;
  }

  getInputValues() {
    return Object.fromEntries(new FormData(this.popupForm));
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", this.handleFormSubmit.bind(this));
    super.setEventListeners();
  }

  showButtonProgress(show) {
    this.submitButtonElement.textContent = show ? this.progressButtonText : this.defaultButtonText;
  }

  reset() {
    this.popupForm.reset();
  }
}

