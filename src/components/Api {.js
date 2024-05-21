export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _fetch(url, options = {}) {
    return fetch(url, { headers: this._headers, ...options }).then(this._checkResponse);
  }

  getInitialCards() {
    return this._fetch(`${this._baseURL}/cards`);
  }

  getUserInfo() {
    return this._fetch(`${this._baseURL}/users/me`);
  }

  updateUserInfo(name, about) {
    return this._fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  addNewCard(name, link) {
    return this._fetch(`${this._baseURL}/cards`, {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(_id) {
    return this._fetch(`${this._baseURL}/cards/${_id}`, {
      method: "DELETE",
    });
  }

  setLike(_id, isLiked) {
    return this._fetch(`${this._baseURL}/cards/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }

  updateProfilePicture(avatar) {
    return this._fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  initialPageLoad() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
