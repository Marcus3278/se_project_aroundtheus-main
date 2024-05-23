import { cardSelectors } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.data = data;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this.cardElement = this._createCardElement();
    this.likeButton = this.cardElement.querySelector(cardSelectors.cardLike);
    this.deleteButton = this.cardElement.querySelector(cardSelectors.cardDelete);
    this.cardTitleElement = this.cardElement.querySelector(cardSelectors.cardTitle);
    this.cardImageElement = this.cardElement.querySelector(cardSelectors.cardImage);
  }

  _createCardElement() {
    const template = document.querySelector(this.cardSelector).content.querySelector(".card");
    return template.cloneNode(true);
  }

  _addEventListeners() {
    this.likeButton.addEventListener("click", this._toggleLikeIcon.bind(this));
    this.deleteButton.addEventListener("click", this._removeCard.bind(this));
    this.cardImageElement.addEventListener("click", () => {
      this.handleImageClick(this.data.name, this.data.link);
    });
  }

  _toggleLikeIcon() {
    this.likeButton.classList.toggle(cardSelectors.cardLikeToggle);
  }

  _removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  generateCard() {
    this.cardTitleElement.textContent = this.data.name;
    this.cardImageElement.src = this.data.link;
    this.cardImageElement.alt = this.data.name;

    this._addEventListeners();
    return this.cardElement;
  }
}

