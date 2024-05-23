export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this.nameElement = document.querySelector(nameSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
    this.avatarElement = document.querySelector(avatarSelector);
  }

  get userInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.descriptionElement.textContent,
      avatar: this.avatarElement.src,
    };
  }

  setUserInfo({name, about}) {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = about;
  }

  setUserAvatar(avatar) {
    this.avatarElement.src = avatar;
  }
}
