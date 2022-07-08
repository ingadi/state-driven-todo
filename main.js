import "./style.css";

class App {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
  }

  render() {
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
    this.dom.innerHTML = tasksHTML;
  }
}

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
