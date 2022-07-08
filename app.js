import morphdom from "morphdom";
export class App {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
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
    newDom.innerHTML = tasksHTML;
    morphdom(this.dom, newDom);
    this.dom = newDom;
  }
}