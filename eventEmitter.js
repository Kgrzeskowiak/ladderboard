class EventEmitter {
  constructor() {
    this.handlers = [];
  }
  addListener(listener) {
    this.handlers.push(listener);
  }
  emit(...data) {
    this.handlers.forEach(function(listener) {
      listener(...data);
    });
  }
}
