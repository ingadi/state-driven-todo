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
            type="button"
          ></button>
        </li>`
        );
        return html;
      }, [])
      .join("");

    newTaskListDom.innerHTML = taskListHTML;
    morphdom(this.#taskListDom.children[0], newTaskListDom);
    this.#taskListDom.children.innerHTML = taskListHTML;
  }

  #eventHandler(event) {
    console.log(event);
    event.preventDefault();
  }
}
