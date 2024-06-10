import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    // Ensure the popup element exists
    if (!this._popupElement) {
      throw new Error(`Popup element with selector "${popupSelector}" not found`);
    }

    // Cache selectors for efficiency
    this._popupForm = this._popupElement.querySelector(selectors.popupForm);
    this._submitButtonElement = this._popupElement.querySelector(selectors.submitButtonSelector);

    if (!this._popupForm) {
      throw new Error(`Form element with selector "${selectors.popupForm}" not found`);
    }
    if (!this._submitButtonElement) {
      throw new Error(`Submit button with selector "${selectors.submitButtonSelector}" not found`);
    }

    this._handleFormSubmit = handleFormSubmit;
    if (typeof this._handleFormSubmit !== 'function') {
      throw new Error('handleFormSubmit should be a function');
    }

    this._progressButtonText = selectors.deletingButtonText || 'Deleting...';
    this._defaultButtonText = selectors.deletingButtonDefaultText || 'Delete';
  }

  // Method to set event listeners
  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  // Method to set the submit action
  setSubmitAction(action) {
    if (typeof action !== 'function') {
      throw new Error('Action should be a function');
    }
    this._handleFormSubmit = action;
  }

  // Method to show button progress
  showButtonProgress(showButtonProgress) {
    if (typeof showButtonProgress !== 'boolean') {
      throw new Error('showButtonProgress should be a boolean');
    }
    this._submitButtonElement.textContent = showButtonProgress ? this._progressButtonText : this._defaultButtonText;
  }
}
