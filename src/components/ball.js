import {
  BALL_TRIANGLE,
  BALL_TRIANGLE_ACTIVE,
  BALL_FORM,
  BALL_FORM_ACTIVE,
  BALL_CLOSE_ICONE,
  BALL_CLOSE_ICON_ACTIVE,
  BALL_P,
  BALL_LOADER,
  BALL_LOADER_ACTIVE,
} from "../constants/constants";
import { glueTheDote } from "../utils";

export default class Ball {

  methodApi = 'GET'

  constructor(idTemplate, pageSelector, callback) {
    this._template = document
      .getElementById(idTemplate)
      .content.cloneNode(true);
    this._ballTriangle = this._template.querySelector(
      glueTheDote(BALL_TRIANGLE)
    );
    this._form = this._ballTriangle.querySelector(glueTheDote(BALL_FORM));
    this._closeIcon = this._ballTriangle.querySelector(
      glueTheDote(BALL_CLOSE_ICONE)
    );
    this._page = document.querySelector(glueTheDote(pageSelector));
    this._callback = callback;
    this._p = this._ballTriangle.querySelector(glueTheDote(BALL_P));
    this._loader = this._ballTriangle.querySelector(glueTheDote(BALL_LOADER));
  }

  setRequest = () => {
    this._loader.classList.toggle(BALL_LOADER_ACTIVE)
  } 

  handleEscClose = (event) => {
    if (event.code === "Escape") {
      this._closeBall();
    }
  };

  handleTransitionend = (event) => {
    this._form.classList.add(BALL_FORM_ACTIVE)
  }

  _closeBall = () => {
    this._addOrRemoveClasses("remove");
    document.removeEventListener("keydown", this.handleEscClose);
    document.removeEventListener('transitionend', this.handleTransitionend);
    this._form.classList.remove(BALL_FORM_ACTIVE)
    this._p.textContent = ''
  };

  _addOrRemoveClasses = (payload) => {
    this._ballTriangle.classList[payload](BALL_TRIANGLE_ACTIVE);
    this._closeIcon.classList[payload](BALL_CLOSE_ICON_ACTIVE);
  };

  _openBall = () => {
    this._addOrRemoveClasses("add");
    this._form.elements["queistion"].focus();
    document.addEventListener("keydown", this.handleEscClose);
    document.addEventListener("transitionend", this.handleTransitionend)
  };

  handle = (event) => {
    if (event.target === this._ballTriangle) {
      this._openBall();
    } else if (event.target === this._closeIcon) {
      this._closeBall();
    }
  };

  render() {
    this._page.append(this._template);
    this._ballTriangle.addEventListener("click", this.handle);
    this._form.addEventListener("submit", this.handleSubmite);
  }

  handleSubmite = (event) => {
    event.preventDefault();
    this._callback(this.methodApi);
    this.setRequest();
  };

  typingText(text) {
    this._form.classList.remove(BALL_FORM_ACTIVE);
    const letters = text.split("");

    let timer = 0;

    for (let i = 0; i < letters.length; i++) {
      setTimeout(() => this._p.append(letters[i]), (timer += 30));
    }
  }
}
