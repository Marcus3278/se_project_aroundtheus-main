import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    const cardDescription = this._popupElement.querySelector(selectors.cardDescription);
    cardDescription.textContent = name;

    const popupImage = this._popupImage || (this._popupImage = this._popupElement.querySelector(selectors.cardImage));
    popupImage.src = link;
    popupImage.alt = name;
    super.open();
  }
}

