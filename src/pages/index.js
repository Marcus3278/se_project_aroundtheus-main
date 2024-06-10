import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, formValidationConfig } from "../utils/constants.js";
import "../pages/index.css";

// Constants
const addCardAddButton = document.querySelector(selectors.cardAddButton);
const updateProfileButton = document.querySelector(selectors.profileEditButton);
const cardFormElement = document.querySelector(selectors.cardPopup);
const profileFormElement = document.querySelector(selectors.profilePopup);
const avatarFormElement = document.querySelector(selectors.avatarPopup);
const profileHeadingInput = profileFormElement.querySelector(selectors.profileName);
const profileDescriptionInput = profileFormElement.querySelector(selectors.profileDescription);
const newImagePopup = new PopupWithImage(selectors.cardImagePopup);
const updateAvatarButton = document.querySelector(selectors.avatarEditButton);

newImagePopup.setEventListeners();

const editProfileFormValidator = new FormValidator(formValidationConfig, profileFormElement);
const cardFormValidator = new FormValidator(formValidationConfig, cardFormElement);
const updateAvatarFormValidator = new FormValidator(formValidationConfig, avatarFormElement);

handleValidation(editProfileFormValidator);
handleValidation(cardFormValidator);
handleValidation(updateAvatarFormValidator);

const userInfo = new UserInfo({
  nameSelector: selectors.profileHeadingElement,
  descriptionSelector: selectors.profileDescriptionElement,
  avatarSelector: selectors.avatarImageElement,
});

s

let cardSection;
api
  .initialPageLoad()
  .then(([cards, user]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = renderCard(item);
          cardSection.addItem(card);
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });


// Event Listeners
addCardAddButton.addEventListener("click", () => {
  newCardPopup.open();
  cardFormValidator.toggleButtonState();
});

updateProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileHeadingInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  editProfileFormValidator.resetValidation();
  updateProfilePopup.open();
});

updateAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

// Functions
function handleValidation(form) {
  form.enableValidation();
}

function handleAddCardFormSubmit(cardData) {
  newCardPopup.showButtonProgress(true);

    .then((res) => {
      const card = renderCard(res);
      cardSection.addItem(card);
      newCardPopup.reset();
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      newCardPopup.showButtonProgress(false);
    });
}

function handleImageClick(name, link) {
  newImagePopup.open(name, link);
}

function handleProfileSubmit(userData) {
  updateProfilePopup.showButtonProgress(true);

    .then((user) => {
      userInfo.setUserInfo(user);
      updateProfilePopup.reset();
      updateProfilePopup.close();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      updateProfilePopup.showButtonProgress(false);
    });
}

function handleDeleteCard(cardData) {
  deletePopup.open();
  deletePopup.setSubmitAction(() => {
    deletePopup.showButtonProgress(true);

        cardData.handleRemoveCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      })
      .finally(() => {
        deletePopup.showButtonProgress(false);
      });
  });
}

function handleLikeIcon(cardData) {

    .then((res) => {
      cardData.handleLikeIcon(res.isLiked);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

function handleEditAvatar(data) {
  avatarPopup.showButtonProgress(true);

    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
      avatarPopup.reset();
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      avatarPopup.showButtonProgress(false);
    });
}

