import { selectors } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose, { once: true });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(selectors.closeButton);
    closeButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    }, { once: true });
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}

