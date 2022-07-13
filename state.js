import { Store } from "./store";

export class State {
  #items;
  #store;

  constructor() {
    this.#store = new Store("tasks");
    this.#items = this.#store.items;
  }

  get items() {
    return [...this.#items];
  }

  async addItem(name) {
    if (name?.length < 1) throw "Invalid name";

    this.#items.push({
      id: `${crypto.randomUUID()}-${Date.now()}`,
      name,
      completed: false,
    });

    setTimeout(() => this.#store.saveItems(this.#items), 0);
  }

  async findItem(id) {
    const taskIdx = this.#items.findIndex((task) => task.id === id);
    if (taskIdx === -1) throw "Not found";
    return [taskIdx, this.#items[taskIdx]];
  }

  async updateItem(id, updates) {
    try {
      const [, task] = await this.findItem(id);
      for (const prop in updates) task[prop] = updates[prop];
      setTimeout(() => this.#store.saveItems(this.#items), 0);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteItem(id) {
    try {
      const [taskIdx] = await this.findItem(id);
      this.#items.splice(taskIdx, 1);
      setTimeout(() => this.#store.saveItems(this.#items), 0);
    } catch (error) {
      console.error(error);
    }
  }
}
