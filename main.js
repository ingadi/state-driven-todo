import "./style.css";
import { App } from "./app";

new App(
  [
    {
      id: Date.now(),
      name: "Task 1",
      completed: true,
    },
    {
      id: Date.now(),
      name: "Task 2",
      completed: false,
    },
    {
      id: Date.now(),
      name: "Task 3",
      completed: false,
    },
    {
      id: Date.now(),
      name: "Task 4",
      completed: false,
    },
  ],
  document.querySelector(".js-task-list"),
  document.querySelector("form")
).render();
