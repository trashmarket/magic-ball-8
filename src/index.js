import "./styles/index.css";
import { glueTheDote } from "./utils";
import {
  PAGE_SELECTOR,
  TEMPLATE_ID,
  BASE_URL_API,
} from "./constants/constants";
import Ball from "./components/ball";
import Api from "./components/api";
import AiForm from "./components/ai-form";

const page = document.querySelector(glueTheDote(PAGE_SELECTOR));

const api = new Api({
  baseUrl: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const aiForm = new AiForm(page, function () {
  localStorage.setItem('keyChat', this.input.value);

  ballMagic.methodApi = "POST";
});

aiForm.render();

const ballMagic = new Ball(TEMPLATE_ID, PAGE_SELECTOR, function (method) {
  const inputQuestion = this._form.elements["queistion"].value;

  const body = {
    apiKey: localStorage.getItem('keyChat') && aiForm.input.value,
  };

  method === "GET" &&
    api
      .getFetch(`static-data/data.json`, "8080")
      .then((res) => {
        setTimeout(() => {
          this.setRequest();
          this.typingText(res.choices[0].message.content);
        }, 1000);
      })
      .catch((err) => console.log(err));

  method === "POST" &&
    api
      .postFetch("chat", "3001", body)
      .then((res) => {
        setTimeout(() => {
          this.setRequest();
          this.typingText(res.choices[0].message.content);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          this.setRequest();
          this.typingText(err);
        }, 1000);
      });
});

ballMagic.render();
