import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement && this._popupElement.querySelector(selectors.cardImage);
  }

  open(name, link) {
    const cardDescriptionElement = this._popupElement && this._popupElement.querySelector(selectors.cardDescription);
    if (cardDescriptionElement) {
      cardDescriptionElement.textContent = name;
    }

    if (this._popupImage) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
    }
    super.open();
  }
}

