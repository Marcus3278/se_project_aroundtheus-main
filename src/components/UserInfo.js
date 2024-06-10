export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    // Ensure the selectors are valid and the elements exist
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    if (!this._nameElement) {
      throw new Error(`Element with selector "${nameSelector}" not found`);
    }
    if (!this._descriptionElement) {
      throw new Error(`Element with selector "${descriptionSelector}" not found`);
    }
    if (!this._avatarElement) {
      throw new Error(`Element with selector "${avatarSelector}" not found`);
    }
  }

  // Method to get user information from the DOM elements
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._descriptionElement.textContent.trim(),
      avatar: this._avatarElement.src,
    };
  }

  // Method to set user information to the DOM elements
  setUserInfo({ name, about }) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Name should be a non-empty string');
    }
    if (typeof about !== 'string' || !about.trim()) {
      throw new Error('Description should be a non-empty string');
    }

    this._nameElement.textContent = name.trim();
    this._descriptionElement.textContent = about.trim();
  }

  // Method to set user avatar to the DOM element
  setUserAvatar(avatar) {
    if (typeof avatar !== 'string' || !avatar.trim()) {
      throw new Error('Avatar should be a non-empty string');
    }

    this._avatarElement.src = avatar.trim();
  }
}
