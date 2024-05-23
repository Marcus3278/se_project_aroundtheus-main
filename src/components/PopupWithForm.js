import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(selectors.popupForm);
    this._submitButtonElement = this._popupElement.querySelector(selectors.submitButtonSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._progressButtonText = selectors.savingButtonText;
    this._defaultButtonText = selectors.saveButtonDefaultText;
  }

  _getInputValues() {
    return new FormData(this._popupForm);
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  showButtonProgress(showButtonProgress) {
    this._submitButtonElement.textContent = showButtonProgress ? this._progressButtonText : this._defaultButtonText;
  }

  reset() {
    this._popupForm.reset();
  }
}
