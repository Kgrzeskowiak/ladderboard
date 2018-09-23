class Panel {
  constructor(application, db) {
    this.app = application;
    this.db = db;
  }
  show() {}
  remove(root) {
    while (root.firstElementChild) {
      root.removeChild(root.firstElementChild);
    }
  }
}
