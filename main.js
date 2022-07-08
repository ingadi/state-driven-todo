import "./style.css";
import { App } from "./app";

new App(
  [
    {
      id: Date.now(),
      name: "Task 1",
    },
    {
      id: Date.now(),
      name: "Task 2",
    },
    {
      id: Date.now(),
      name: "Task 3",
    },
    {
      id: Date.now(),
      name: "Task 4",
    },
  ],
  document.querySelector(".list")
).render();
