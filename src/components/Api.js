export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getInitialCards() {
    const url = `${this.baseUrl}/cards`;
    const response = await fetch(url, { headers: this.headers });
    return this.checkResponse(response);
  }

  async getUserInfo() {
    const url = `${this.baseUrl}/users/me`;
    const response = await fetch(url, { headers: this.headers });
    return this.checkResponse(response);
  }

  async updateUserInfo(name, about) {
    const url = `${this.baseUrl}/users/me`;
    const body = JSON.stringify({ name, about });
    const response = await fetch(url, { method: "PATCH", headers: this.headers, body });
    return this.checkResponse(response);
  }

  async addNewCard(name, link) {
    const url = `${this.baseUrl}/cards`;
    const body = JSON.stringify({ name, link });
    const response = await fetch(url, { method: "POST", headers: this.headers, body });
    return this.checkResponse(response);
  }

  async deleteCard(cardId) {
    const url = `${this.baseUrl}/cards/${cardId}`;
    const response = await fetch(url, { method: "DELETE", headers: this.headers });
    return this.checkResponse(response);
  }

  async toggleLike(cardId, isLiked) {
    const url = `${this.baseUrl}/cards/${cardId}/likes`;
    const method = isLiked ? "DELETE" : "PUT";
    const response = await fetch(url, { method, headers: this.headers });
    return this.checkResponse(response);
  }

  async updateProfilePicture(avatar) {
    const url = `${this.baseUrl}/users/me/avatar`;
    const body = JSON.stringify({ avatar });
    const response = await fetch(url, { method: "PATCH", headers: this.headers, body });
    return this.checkResponse(response);
  }

  async initialPageLoad() {
    const [cards, user] = await Promise.all([
      this.getInitialCards(),
      this.getUserInfo(),
    ]);
    return [cards, user];
  }
}

