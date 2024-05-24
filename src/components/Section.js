export default class Section {
  constructor({ items = [], renderer }, classSelector) {
    if (!Array.isArray(items)) {
      throw new Error('Items should be an array');
    }
    if (typeof renderer !== 'function') {
      throw new Error('Renderer should be a function');
    }
    
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);

    if (!this._container) {
      throw new Error(`Container with selector "${classSelector}" not found`);
    }
  }

  // Method to render all items using the provided renderer function
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // Public method to add a single DOM element to the beginning of the container
  addItem(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Element should be a valid DOM element');
    }
    this._container.prepend(element);
  }

  // Public method to add a single DOM element to the end of the container
  appendItem(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Element should be a valid DOM element');
    }
    this._container.append(element);
  }
}
