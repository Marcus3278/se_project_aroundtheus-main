import { selectors } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    
    if (!this._popupElement) {
      throw new Error(`Popup element with selector "${popupSelector}" not found`);
    }

    this._buttonElement = this._popupElement.querySelector(selectors.closeButton);

    if (!this._buttonElement) {
      throw new Error(`Close button with selector "${selectors.closeButton}" not found`);
    }
  }

  // Method to open the popup
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Method to close the popup
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Method to set event listeners
  setEventListeners() {
    this._buttonElement.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }

  // Private method to handle escape key press to close the popup
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
