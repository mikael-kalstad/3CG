class NoteService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
  }

  getAnnotationsArray() {
    return this.json;
  }

  getAnnotationsInTimeframe(start, end) {
    let annotations = this.getAnnotations();
    let result = [];
    for (let i in annotations) {
      let ann = annotations[i];
    }
  }
}

export let noteService = new NoteService('../data/annotations.json');
