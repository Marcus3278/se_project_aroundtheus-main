import { cardselectors } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeIcon) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id; // Properly using this.id for referencing outside
    this.isLiked = data.isLiked; // Utilizing public property directly
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(cardselectors.cardLike);
    this._deleteButton = this._cardElement.querySelector(cardselectors.cardDelete); // Correct typo: cardelElement -> cardElement
    this._cardTitleElement = this._cardElement.querySelector(cardselectors.cardTitle);
    this._cardImageElement = this._cardElement.querySelector(cardselectors.cardImage);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this); // Modified to use this.id
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _renderLikeIcon() {
    if (this.isLiked) {
      this._likeButton.classList.add(cardselectors.cardLikeToggle);
    } else {
      this._likeButton.classList.remove(cardselectors.cardLikeToggle);
    }
  }

  handleLikeIcon(isLiked) {
    this.isLiked = isLiked;
    this._renderLikeIcon();
  }

  handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    this._renderLikeIcon();
    return this._cardElement;
  }
}
