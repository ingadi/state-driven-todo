import morphdom from "morphdom";
export class App {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
    this.dom.parentNode.addEventListener(
      "change",
      this.eventHandler.bind(this)
    );
    this.dom.parentNode.addEventListener(
      "submit",
      this.eventHandler.bind(this)
    );
    this.dom.parentNode.addEventListener("click", this.eventHandler.bind(this));
  }

  render() {
    const newDom = document.createElement("ul");
    const tasksHTML = this.state
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

    newDom.className = "list";
    newDom.dataset.list = "";
    newDom.innerHTML = tasksHTML;
    morphdom(this.dom, newDom);
    this.dom = newDom;
  }

  eventHandler(event) {
    console.log(event);
  }
}
