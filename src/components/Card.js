import { cardselectors } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeIcon) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._cardElement = this._createCardElement();
  }

  _createCardElement() {
    const template = document.querySelector(this._cardSelector).content.querySelector(".card");
    const cardElement = template.cloneNode(true);
    this._likeButton = cardElement.querySelector(cardselectors.cardLike);
    this._deleteButton = cardElement.querySelector(cardselectors.cardDelete);
    this._cardTitleElement = cardElement.querySelector(cardselectors.cardTitle);
    this._cardImageElement = cardElement.querySelector(cardselectors.cardImage);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeClick.bind(this));
    this._deleteButton.addEventListener("click", this._handleDeleteClick.bind(this));
    this._cardImageElement.addEventListener('click', this._handleImageClick.bind(this));
  }

  _handleLikeClick() {
    this._handleLikeIcon(this._data._id, this._data.isLiked);
  }

  _handleDeleteClick() {
    this._handleDeleteCard(this._data);
  }

  generateCard() {
    this._setEventListeners();
    this._cardTitleElement.textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    return this._cardElement;
  }
}

