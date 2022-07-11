import morphdom from "morphdom";

export class App {
  #state;
  #taskListDom;
  #renderCount;

  constructor(state, taskListDom, formElement) {
    this.#state = state;
    this.#taskListDom = taskListDom;
    this.#renderCount = 0;
    taskListDom.addEventListener("click", this.#eventHandler.bind(this));
    formElement.addEventListener("submit", this.#eventHandler.bind(this));
  }

  render() {
    this.#renderCount++;
    const newTaskListDom = document.createElement("div");
    const taskListHTML = this.#state
      .reduce((html, task) => {
        html.push(
          `<li class="list__item">
          <input
            title="Mark done"
            class="list__item-checkbox"
            type="checkbox"
            name="${task.name}"
            id="${task.id}"
            ${task.completed ? "checked" : ""}
          />
          <span class="list__item-text">${task.name}</span>
          <button
            title="Delete task"
            class="list__item-remove"
            data-task-id="${task.id}"
            type="button"
          ></button>
        </li>`
        );
        return html;
      }, [])
      .join("");

    newTaskListDom.className = this.#renderCount < 2 ? "first-render" : "";
    newTaskListDom.innerHTML = taskListHTML;
    morphdom(this.#taskListDom.children[0], newTaskListDom);
  }

  #eventHandler(event) {
    if (event.type === "submit") {
      event.preventDefault();
      // Todo: Fix state mutation later
      // Todo: handle data validation in state class later
      this.#state.push({
        id: `${Date.now() * Math.random()}`,
        name: new FormData(event.target).get("task-name"),
        completed: false,
      });
      event.target.reset();
      this.render();
    } else if (event.target.type === "checkbox") {
      const taskToUpdate = this.#state.find(
        (task) => task.id === event.target.id
      );
      taskToUpdate.completed = event.target.checked;
    } else if (event.target.type === "button") {
      const taskIdx = this.#state.findIndex(
        (task) => task.id === event.target.dataset.taskId
      );
      this.#state.splice(taskIdx, 1);
      this.render();
    }
  }
}
