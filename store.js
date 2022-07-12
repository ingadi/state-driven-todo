export class Store {
  #key;

  constructor(key) {
    this.#key = key;
  }

  get items() {
    return JSON.parse(localStorage.getItem(`${this.#key}`)) ?? [];
  }

  saveItems(values) {
    localStorage.setItem(`${this.#key}`, JSON.stringify(values));
  }
}
