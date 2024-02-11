export default class Api {
  constructor(option) {
    this._option = option;
  }

  catchError(res) {
    console.log(res);
  }

  _checkRes(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getFetch(payload, port) {
    return fetch(this._option.baseUrl + port + '/' + payload, {
      headers: this._option.headers,
    }).then(this._checkRes);
  }

  postFetch(payload, port, body) {

    return fetch(this._option.baseUrl + port + '/' + payload, {
      headers: this._option.headers,
      method: 'POST',
      body: JSON.stringify(body)
    }).then(this._checkRes);
  }
}
