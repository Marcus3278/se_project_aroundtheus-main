import { constants } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
    this.closeButtonElement = this.popupElement.querySelector(constants.closeButton);
  }

  open() {
    this.popupElement.classList.add("modal_opened");
    this.addKeyDownListener();
  }

  close() {
    this.popupElement.classList.remove("modal_opened");
    this.removeKeyDownListener();
  }

  setEventListeners() {
    this.closeButtonElement.addEventListener("click", () => this.close());
    this.popupElement.addEventListener("mousedown", this.handleMouseDown);
  }

  addKeyDownListener() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  removeKeyDownListener() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleMouseDown = (event) => {
    if (event.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}

