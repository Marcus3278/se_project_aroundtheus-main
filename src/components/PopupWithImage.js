import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    // Ensure the popup element exists
    if (!this._popupElement) {
      throw new Error(`Popup element with selector "${popupSelector}" not found`);
    }

    // Cache selectors for efficiency
    this._cardDescription = this._popupElement.querySelector(selectors.cardDescription);
    this._popupImage = this._popupElement.querySelector(selectors.cardImage);

    if (!this._cardDescription) {
      throw new Error(`Element with selector "${selectors.cardDescription}" not found`);
    }
    if (!this._popupImage) {
      throw new Error(`Element with selector "${selectors.cardImage}" not found`);
    }
  }

  // Open the popup with the provided image name and link
  open(name, link) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Name should be a non-empty string');
    }
    if (typeof link !== 'string' || !link.trim()) {
      throw new Error('Link should be a non-empty string');
    }

    this._cardDescription.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;

    super.open();
  }
}
