import morphdom from "morphdom";

export class App {
  #state;
  #taskListDom;

  constructor(state, taskListDom, formElement) {
    this.#state = state;
    this.#taskListDom = taskListDom;
    taskListDom.addEventListener("click", this.#eventHandler.bind(this));
    formElement.addEventListener("submit", this.#eventHandler.bind(this));
  }

  render() {
    const taskListHTML = this.#state.items
      .map(
        (task) =>
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
      )
      .join("");
    // Can use tagged template functions to return node and skip doing the innerHTML stuff
    const newTaskListDom = document.createElement("div");
    newTaskListDom.innerHTML = taskListHTML;
    morphdom(this.#taskListDom.children[0], newTaskListDom);
  }

  async #eventHandler(event) {
    try {
      if (event.type === "submit") {
        event.preventDefault();
        await this.#state.addItem(new FormData(event.target).get("task-name"));
        event.target.reset();
        this.render();
      } else if (event.target.type === "checkbox") {
        await this.#state.updateItem(event.target.id, {
          completed: event.target.checked,
        });
      } else if (event.target.type === "button") {
        await this.#state.deleteItem(event.target.dataset.taskId);
        this.render();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
