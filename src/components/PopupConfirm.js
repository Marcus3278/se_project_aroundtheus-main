import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this.popupElement.querySelector(selectors.popupForm);
    this.submitButton = this.popupElement.querySelector(selectors.submitButtonSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.progressText = selectors.deletingButtonText;
    this.defaultText = selectors.deletingButtonDefaultText;
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmit();
    });
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this.handleFormSubmit = action;
  }

  showButtonProgress(show) {
    this.submitButton.textContent = show ? this.progressText : this.defaultText;
  }
}

