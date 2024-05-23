import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._formSelector = selectors.popupForm;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._progressButtonText = selectors.deletingButtonText;
    this._defaultButtonText = selectors.deletingButtonDefaultText;
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    const popupForm = this._popupElement.querySelector(this._formSelector);
    const submitButton = this._popupElement.querySelector(this._submitButtonSelector);
    popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
    this._submitButtonElement = submitButton;
    this._popupForm = popupForm;
  }

  showButtonProgress(show) {
    this._submitButtonElement.textContent = show ? this._progressButtonText : this._defaultButtonText;
  }
}

