import "./styles/index.css";
import {
  PAGE_SELECTOR,
  TEMPLATE_ID,
  BASE_URL_API,
} from "./constants/constants";
import Ball from "./components/ball";
import Api from "./components/api";

const api = new Api({
  baseUrl: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const ballMagic = new Ball(TEMPLATE_ID, PAGE_SELECTOR, function () {
  const inputQuestion = this._form.elements["queistion"].value
    .split(" ")
    .join("+");

  api
    .getFetch(`static-data/data.json`)
    .then((res) => {
      setTimeout(() => {
        this.setRequest();
        this.typingText(res.choices[0].message.content);
      }, 1000);
    })
    .catch((err) => console.log(err));
});

ballMagic.render();
