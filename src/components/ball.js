import {
  BALL_TRIANGLE,
  BALL_TRIANGLE_ACTIVE,
  BALL_FORM,
  BALL_FORM_ACTIVE,
  BALL_CLOSE_ICONE,
  BALL_CLOSE_ICON_ACTIVE
} from "../constants/constants";
import { glueTheDote } from "../utils";

export default class Ball {
  constructor(idTemplate, pageSelector, callback) {
    this._template = document
      .getElementById(idTemplate)
      .content.cloneNode(true);
    this._ballTriangle = this._template.querySelector(glueTheDote(BALL_TRIANGLE));
    this._form = this._ballTriangle.querySelector(glueTheDote(BALL_FORM));
    this._closeIcon = this._ballTriangle.querySelector(glueTheDote(BALL_CLOSE_ICONE));
    this._page = document.querySelector(glueTheDote(pageSelector));
    this._callback = callback;
  }

  _handleEscClose = (event) => {
    if (event.code === "Escape") {
      this._closeBall();
    }
  };

  _closeBall = () => {
    this._addOrRemoveClasses('remove');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _addOrRemoveClasses = (payload) => {
    this._ballTriangle.classList[payload](BALL_TRIANGLE_ACTIVE);
    this._closeIcon.classList[payload](BALL_CLOSE_ICON_ACTIVE);
    this._form.classList[payload](BALL_FORM_ACTIVE);
  }

  _openBall = () => {
    this._addOrRemoveClasses('add');
    this._form.elements['queistion'].focus();
    document.addEventListener("keydown", this._handleEscClose);
  };

  handle = (event) => {
    if (event.target === this._ballTriangle) {
      this._openBall();
    } else if (event.target === this._closeIcon) {
      this._closeBall()
    }
  }

  render() {
    this._page.append(this._template);
    this._ballTriangle.addEventListener("click", this.handle);
    this._closeIcon.addEventListener('click', this.handle)
    this._form.addEventListener('submit', this.handleSubmite)
  }

  handleSubmite = (event) => {
    event.preventDefault();
    this._callback();
  }
}
