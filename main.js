import "./style.css";
import { App } from "./app";
import { State } from "./state";

new App(
  new State(),
  document.querySelector(".js-task-list"),
  document.querySelector(".js-form")
).render();
