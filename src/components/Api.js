export default class Api {
  constructor({ baseURL, headers }) {
    this._baseUrl = baseURL;
    this._headers = headers;
  }

  async _fetch(url, options = {}) {
    const { method = "GET", body } = options;
    const response = await fetch(url, { ...options, headers: this._headers, method, body: body && JSON.stringify(body) });
    return response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status}`));
  }

  getInitialCards() {
    return this._fetch(`${this._baseUrl}/cards`);
  }

  getUserInfo() {
    return this._fetch(`${this._baseUrl}/users/me`);
  }

  updateUserInfo({ name, about }) {
    return this._fetch(`${this._baseUrl}/users/me`, { method: "PATCH", body: { name, about } });
  }

  addNewCard({ name, link }) {
    return this._fetch(`${this._baseUrl}/cards`, { method: "POST", body: { name, link } });
  }

  deleteCard(_id) {
    return this._fetch(`${this._baseUrl}/cards/${_id}`, { method: "DELETE" });
  }

  setLike(_id, isLiked) {
    return this._fetch(`${this._baseUrl}/cards/${_id}/likes`, { method: isLiked ? "DELETE" : "PUT" });
  }

  updateProfilePicture({ avatar }) {
    return this._fetch(`${this._baseUrl}/users/me/avatar`, { method: "PATCH", body: { avatar } });
  }

  initialPageLoad() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

