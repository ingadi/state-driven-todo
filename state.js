export class State {
  #items;
  constructor() {
    this.#items = [
      {
        id: `${crypto.randomUUID()}-${Date.now()}`,
        name: "Task 1",
        completed: true,
      },
      {
        id: `${crypto.randomUUID()}-${Date.now()}`,
        name: "Task 2",
        completed: false,
      },
      {
        id: `${crypto.randomUUID()}-${Date.now()}`,
        name: "Task 3",
        completed: false,
      },
      {
        id: `${crypto.randomUUID()}-${Date.now()}`,
        name: "Task 4",
        completed: false,
      },
    ];
  }

  get items() {
    return [...this.#items];
  }

  async addItem(name) {
    if (name?.length > 0) {
      this.#items.push({
        id: `${crypto.randomUUID()}-${Date.now()}`,
        name,
        completed: false,
      });
      return;
    }
    throw "Invalid name";
  }

  async findItem(id) {
    const taskIdx = this.#items.findIndex((task) => task.id === id);
    if (taskIdx === -1) throw "Not found";
    return [taskIdx, this.#items[taskIdx]];
  }

  async updateItem(id, updates) {
    try {
      const [_, task] = await this.findItem(id);
      for (const prop in updates) task[prop] = updates[prop];
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteItem(id) {
    try {
      const [taskIdx] = await this.findItem(id);
      this.#items.splice(taskIdx, 1);
    } catch (error) {
      console.error(error);
    }
  }
}
