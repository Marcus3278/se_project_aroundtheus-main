export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this.elements = {
      name: document.querySelector(nameSelector),
      description: document.querySelector(descriptionSelector),
      avatar: document.querySelector(avatarSelector),
    };
  }

  get userInfo() {
    const {name, description, avatar} = this.elements;
    return {
      name: name.textContent,
      about: description.textContent,
      avatar: avatar.src,
    };
  }

  setUserInfo({name, about}) {
    const {name: nameElement, description: descriptionElement} = this.elements;
    nameElement.textContent = name;
    descriptionElement.textContent = about;
  }

  setUserAvatar(avatar) {
    this.elements.avatar.src = avatar;
  }
}

