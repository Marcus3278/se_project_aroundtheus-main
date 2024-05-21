export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._descriptionElement.textContent = about;
    }
  }

  setUserAvatar(avatar) {
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
