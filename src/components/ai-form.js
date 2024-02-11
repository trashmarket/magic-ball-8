import { glueTheDote } from "../utils";
import {
  TEMPLATE_AI_ID,
  KEYAI_SLIDER,
  KEYAI_SLIDER_ACTIVE,
  KEYAI_BOX,
  KEYAI_INPUT_TEXT,
  KEYAI_INPUT_TEXT_ACTIVE,
  KEYAI_BUTTON,
  KEYAI_BUTTON_ACTIVE,
  KEYAI,
} from "../constants/constants";

export default class AiForm {
  constructor(page, callBack) {
    this._callBack = callBack;
    this._formTemplate = document
      .getElementById(TEMPLATE_AI_ID)
      .content.cloneNode(true);
    this._page = page;
    this._form = this._formTemplate.querySelector(glueTheDote(KEYAI));
    this._sliderBox = this._formTemplate.querySelector(glueTheDote(KEYAI_BOX));
    this._slider = this._formTemplate.querySelector(glueTheDote(KEYAI_SLIDER));
    this.input = this._formTemplate.querySelector(
      glueTheDote(KEYAI_INPUT_TEXT)
    );
    this._button = this._formTemplate.querySelector(glueTheDote(KEYAI_BUTTON));
  }

  handleClick = (event) => {
    if (
      event.target.classList.contains(KEYAI_BOX) ||
      event.target.classList.contains(KEYAI_SLIDER)
    ) {
      localStorage.getItem("keyChat")
        ? (this.input.value = localStorage.getItem("keyChat"))
        : (this.input.value = "");
      this._toggle([this._slider, this.input, this._button]);
    }
  };

  _toggle(arr) {
    const reg = /^\b[a-z]+_{2}[a-z-]+[a-z]+\b/i;

    arr.forEach((item) => {
      const selector = item.className.match(reg)[0] + "_active";
      item.classList.toggle(selector);
    });
  }

  handleSubmite = (event) => {
    event.preventDefault();
    this._callBack();
  };

  render() {
    this._page.append(this._formTemplate);
    this._sliderBox.addEventListener("click", this.handleClick);
    this._form.addEventListener("submit", this.handleSubmite);
  }
}
